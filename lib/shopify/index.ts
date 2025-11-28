import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
	addToCartMutation,
	createCartMutation,
	editCartItemMutation,
	removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { getCollectionProductsQuery, getCollectionsQuery } from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import {
	getProductQuery,
	getProductRecommendationsQuery,
	getProductsQuery,
} from "./queries/product";
import ShopifyCart from "@/types/ShopifyCart";
import Cart from "@/types/cart";
import Collection from "@/types/collection";
import Connection from "@/types/connection";
import Product from "@/types/product";
import ShopifyCollection from "@/types/shopifyCollection";
import shopifyImage from "@/types/shopifyImage";
import ShopifyMenu from "@/types/shopifyMenu";
import {
	ShopifyAddToCartOperation,
	ShopifyCartOperation,
	ShopifyCollectionProductsOperation,
	ShopifyCollectionsOperation,
	ShopifyCreateCartOperation,
	ShopifyMenuOperation,
	ShopifyProductOperation,
	ShopifyProductRecommendationsOperation,
	ShopifyProductsOperation,
	ShopifyRemoveFromCartOperation,
	ShopifyUpdateCartOperation,
} from "@/types/shopifyOperations";
import ShopifyProduct from "@/types/shopifyProduct";

type ExtractVariables<T> = T extends { variables: infer V } ? V : never;

/* ---------------------
-- Constants -----------
---------------------- */
const domain = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
	: "";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;

/* ---------------------
-- Util functions ------
---------------------- */
function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
	return array.edges.map(edge => edge?.node);
}

function reshapeCart(cart: ShopifyCart): Cart {
	if (!cart.cost?.totalTaxAmount) {
		cart.cost.totalTaxAmount = {
			amount: "0.0",
			currencyCode: "USD",
		};
	}
	return {
		...cart,
		lines: removeEdgesAndNodes(cart.lines),
	};
}

function reshapeCollection(collection: ShopifyCollection): Collection | undefined {
	if (!collection) return undefined;
	return {
		...collection,
		path: `/collections/${collection.handle}`,
	};
}

function reshapeCollections(collections: ShopifyCollection[]): Collection[] {
	const reshapedCollections = [];
	for (const collection of collections) {
		if (collection) {
			const reshapedCollection = reshapeCollection(collection);
			if (reshapedCollection) {
				reshapedCollections.push(reshapedCollection);
			}
		}
	}
	return reshapedCollections;
}

function reshapeImages(images: Connection<shopifyImage>, title: string) {
	const flattened = removeEdgesAndNodes(images);

	return flattened.map(image => {
		const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

		return {
			...image,
			altText: image.altText || `${title} $ ${filename}`,
		};
	});
}

function reshapeProduct(
	product: ShopifyProduct,
	filterHiddenProducts: boolean = true,
): Product | undefined {
	if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
		return undefined;
	}

	const { images, variants, ...rest } = product;

	return {
		...rest,
		images: reshapeImages(images, product.title),
		variants: removeEdgesAndNodes(variants),
	};
}

function reshapeProducts(products: ShopifyProduct[]): Product[] {
	const reshapedProducts = [];
	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeProduct(product);
			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}
	return reshapedProducts;
}

/* ---------------------
-- Main Fetch Function -
---------------------- */
export async function shopifyFetch<T>({
	cache = "force-cache",
	headers,
	query,
	tags,
	variables,
}: {
	cache?: RequestCache;
	headers?: HeadersInit;
	query: string;
	tags?: string[];
	variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
	try {
		const result = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": key,
				...headers,
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables }),
			}),
			cache,
			...(tags && { next: { tags } }),
		});
		const body = await result.json();
		if (body.errors) {
			throw body.errors[0];
		}
		return {
			status: result.status,
			body,
		};
	} catch (error) {
		if (isShopifyError(error)) {
			throw {
				cause: error.cause?.toString() || "unknown",
				status: error.status || "500",
				message: error.message,
				query,
			};
		}
		throw {
			error,
			query,
		};
	}
}

/* ---------------------
-- Fetchers ------------
---------------------- */
export async function addToCart(
	cartId: string,
	lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyAddToCartOperation>({
		cache: "no-cache",
		query: addToCartMutation,
		variables: { cartId, lines },
	});

	return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function createCart(): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCreateCartOperation>({
		query: createCartMutation,
		cache: "no-cache",
	});

	return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(cartId: string | undefined): Promise<Cart | undefined> {
	if (!cartId) {
		return undefined;
	}

	const res = await shopifyFetch<ShopifyCartOperation>({
		query: getCartQuery,
		variables: { cartId },
		tags: [TAGS.cart],
	});

	// old carts becomes 'null' when you checkout
	if (!res.body.data.cart) {
		return undefined;
	}

	return reshapeCart(res.body.data.cart);
}

export async function getCollectionProducts({
	collection,
	reverse,
	sortKey,
}: {
	collection: string;
	reverse?: boolean;
	sortKey?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
		cache: "no-store",
		query: getCollectionProductsQuery,
		tags: [TAGS.collections, TAGS.products],
		variables: {
			handle: collection,
			reverse,
			sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
		},
	});

	if (!res.body?.data?.collection) {
		return [];
	}

	return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
	const res = await shopifyFetch<ShopifyCollectionsOperation>({
		cache: "no-store",
		query: getCollectionsQuery,
		tags: [TAGS.collections],
	});

	const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
	const collections: Collection[] = [
		{
			handle: "",
			title: "All",
			description: "All products",
			seo: {
				title: "All",
				description: "All products",
			},
			path: "/collections",
			updatedAt: new Date().toISOString(),
			image: null,
		},
		...reshapeCollections(shopifyCollections).filter(
			collection => !collection.handle.startsWith("hidden"),
		),
	];

	return collections;
}

export async function getMenu(handle: string): Promise<ShopifyMenu[]> {
	const res = await shopifyFetch<ShopifyMenuOperation>({
		query: getMenuQuery,
		tags: [TAGS.collections],
		variables: { handle },
	});

	return (
		res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
			title: item.title,
			path: item.url.replace(domain, "").replace("/collections", "/search").replace("/pages", ""),
		})) || []
	);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		cache: "no-store",
		query: getProductQuery,
		tags: [TAGS.products],
		variables: { handle },
	});

	return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
		cache: "no-store",
		query: getProductRecommendationsQuery,
		tags: [TAGS.products],
		variables: { productId },
	});

	return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
	query,
	reverse = true,
	sortKey,
	first = 20,
}: {
	query?: string;
	reverse?: boolean;
	sortKey?: string;
	first?: number;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductsOperation>({
		cache: "no-store",
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: { query, reverse, sortKey, first },
	});

	return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
	const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
		query: removeFromCartMutation,
		cache: "no-store",
		variables: { cartId, lineIds },
	});

	return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
	cartId: string,
	lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyUpdateCartOperation>({
		query: editCartItemMutation,
		cache: "no-store",
		variables: { cartId, lines },
	});

	return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

/* ---------------------
-- Back ----------------
---------------------- */

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
	// We always need to respond with a 200 status code to shopify,
	// otherwise it will continue to retry the request.

	const collectionWebhooks = ["collections/create", "collections/delete", "collections/update"];
	const productWebhooks = ["products/create", "products/delete", "products/update"];
	const topic = (await headers()).get("x-shopify-topic") || "unkown";
	const secret = req.nextUrl.searchParams.get("secret");
	const isCollectionUpdate = collectionWebhooks.includes(topic);
	const isProductUpdate = productWebhooks.includes(topic);

	if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
		console.error("Invalid revalidation secret.");
		return NextResponse.json({ status: 200 });
	}

	if (!isCollectionUpdate && !isProductUpdate) {
		return NextResponse.json({ status: 200 });
	}

	if (isCollectionUpdate) {
		revalidateTag(TAGS.collections, { expire: 0 });
	}

	if (isProductUpdate) {
		revalidateTag(TAGS.products, { expire: 0 });
	}

	return NextResponse.json({ status: 200, revalidate: true, now: Date.now() });
}
