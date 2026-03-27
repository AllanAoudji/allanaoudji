import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith, getLineQuantity } from "../utils";
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
import { getDiscountsQuery } from "./queries/discount";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
	getLatestProductsQuery,
	getPopularProductsQuery,
	getProductQuery,
	getProductRecommendationsQuery,
	getProductsQuery,
	getProductVariantsInventoryQuery,
} from "./queries/product";
import ShopifyCart from "@/types/ShopifyCart";
import VariantInventory from "@/types/VariantInventory";
import Cart from "@/types/cart";
import Collection from "@/types/collection";
import Connection from "@/types/connection";
import Product from "@/types/product";
import ShopifyCollection from "@/types/shopifyCollection";
import { DiscountNode } from "@/types/shopifyDiscount";
import shopifyImage from "@/types/shopifyImage";
import ShopifyMenu from "@/types/shopifyMenu";
import {
	ShopifyAddToCartOperation,
	ShopifyCartOperation,
	ShopifyCollectionProductsOperation,
	ShopifyCollectionsOperation,
	ShopifyCreateCartOperation,
	ShopifyDiscountsQueryOperation,
	ShopifyLatestProductsOperation,
	ShopifyMenuOperation,
	ShopifyPageOperation,
	ShopifyPagesOperation,
	ShopifyPopularProductsOperation,
	ShopifyProductOperation,
	ShopifyProductRecommendationsOperation,
	ShopifyProductsOperation,
	ShopifyRemoveFromCartOperation,
	ShopifyUpdateCartOperation,
	ShopifyVariantsInventoryQueryOperation,
} from "@/types/shopifyOperations";
import { ShopifyPage } from "@/types/shopifyPage";
import ShopifyPageInfo from "@/types/shopifyPageInfo";
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

	const { images, variants, collections, ...rest } = product;

	return {
		...rest,
		images: reshapeImages(images, product.title),
		variants: removeEdgesAndNodes(variants),
		collections: collections.edges.map(edge => edge.node),
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

const stockWarningMessage = (quantityAdded: number): string => {
	if (!quantityAdded) {
		return "Stock indisponible. L'article n'a pas pu être ajouté au panier";
	}
	if (quantityAdded === 1) return "Stock indisponible. Seulement 1 article a été ajouté au panier.";

	return `Stock indisponible. Seulement ${quantityAdded} articles ont été ajouté au panier.`;
};

/* ---------------------
-- Main Fetch Function -
---------------------- */
export async function shopifyAdminFetch<T>({
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
}): Promise<{ status: number; body: T }> {
	try {
		const result = await fetch(
			`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/${SHOPIFY_GRAPHQL_API_ENDPOINT}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
					...headers,
				},
				body: JSON.stringify({
					...(query && { query }),
					...(variables && { variables }),
				}),
				cache,
				...(tags && { next: { tags } }),
			},
		);
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
	variantId: string,
	quantity: number,
	previousQuantity: number,
): Promise<{ warning?: string; data: { cart: Cart; quantityAdded: number } }> {
	const res = await shopifyFetch<ShopifyAddToCartOperation>({
		cache: "no-store",
		query: addToCartMutation,
		variables: {
			cartId,
			lines: [{ merchandiseId: variantId, quantity }],
		},
	});

	const updatedCart = reshapeCart(res.body.data.cartLinesAdd.cart);

	const line = updatedCart.lines.find(line => line.merchandise.id === variantId);

	const newQuantity = line?.quantity ?? 0;

	const actuallyAdded = Math.max(0, newQuantity - previousQuantity);

	return {
		data: {
			cart: updatedCart,
			quantityAdded: actuallyAdded,
		},
		warning: actuallyAdded < quantity ? stockWarningMessage(actuallyAdded) : undefined,
	};
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
	after,
	collection,
	first = 10,
	reverse,
	sortKey,
}: {
	after?: string;
	collection: string;
	reverse?: boolean;
	sortKey?: string;
	first?: number;
}): Promise<{
	pageInfo: ShopifyPageInfo;
	products: Product[] | null;
}> {
	const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
		cache: "no-store",
		query: getCollectionProductsQuery,
		tags: [TAGS.collections, TAGS.products],
		variables: {
			after,
			first,
			handle: collection,
			reverse,
			sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
		},
	});

	if (!res.body?.data?.collection) {
		return {
			pageInfo: {
				endCursor: null,
				hasNextPage: false,
			},
			products: null,
		};
	}

	return {
		pageInfo: res.body.data.collection.products.pageInfo,
		products: reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products)),
	};
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
			updatedAt: "",
			image: null,
		},
		...reshapeCollections(shopifyCollections).filter(
			collection => !collection.handle.startsWith("hidden"),
		),
	];

	return collections;
}

export async function getDiscount(): Promise<DiscountNode[]> {
	const res = await shopifyAdminFetch<ShopifyDiscountsQueryOperation>({
		query: getDiscountsQuery,
		cache: "no-store",
	});

	return res.body.data.discountNodes.edges.map(edge => edge.node);
}

export async function getLatestProducts(): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyLatestProductsOperation>({
		cache: "no-store",
		query: getLatestProductsQuery,
		tags: [TAGS.products],
	});

	if (!res.body.data.collection) {
		return [];
	}

	return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
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

export async function getPage(handle: string): Promise<ShopifyPage> {
	const res = await shopifyFetch<ShopifyPageOperation>({
		query: getPageQuery,
		cache: "no-store",
		variables: { handle },
	});

	return res.body.data.pageByHandle;
}

export async function getPages(): Promise<ShopifyPage[]> {
	const res = await shopifyFetch<ShopifyPagesOperation>({
		query: getPagesQuery,
		cache: "no-store",
	});

	return removeEdgesAndNodes(res.body.data.pages);
}

export async function getPopularProducts(): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyPopularProductsOperation>({
		cache: "no-store",
		query: getPopularProductsQuery,
		tags: [TAGS.products],
	});

	if (!res.body.data.collection) {
		return [];
	}

	return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getProduct(handle: string): Promise<Product | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		cache: "no-store",
		query: getProductQuery,
		tags: [TAGS.products],
		variables: { handle },
	});

	if (!res.body.data.product) {
		return undefined;
	}

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
	after,
	first = 10,
	query,
	reverse = true,
	sortKey,
}: {
	after?: string;
	query?: string;
	reverse?: boolean;
	sortKey?: string;
	first?: number;
}): Promise<{
	pageInfo: ShopifyPageInfo;
	products: Product[];
}> {
	const res = await shopifyFetch<ShopifyProductsOperation>({
		cache: "no-store",
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: { after, first, query, reverse, sortKey },
	});

	return {
		pageInfo: res.body.data.products.pageInfo,
		products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
	};
}

export async function getProductVariantsInventory(productId: string): Promise<VariantInventory[]> {
	const res = await shopifyAdminFetch<ShopifyVariantsInventoryQueryOperation>({
		query: getProductVariantsInventoryQuery,
		cache: "no-store",
		variables: { productId },
	});

	return (
		res.body.data.product?.variants.edges.map(edge => ({
			variantId: edge.node.id,
			variantTitle: edge.node.title,
			sku: edge.node.sku,
			inventoryQuantity: edge.node.inventoryQuantity,
			inventoryTracked: edge.node.inventoryItem.tracked,
		})) ?? []
	);
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
	lineId: string,
	variantId: string,
	quantity: number,
	previousQuantity: number,
): Promise<{ warning?: string; data: { cart: Cart; quantityAdded: number } }> {
	const res = await shopifyFetch<ShopifyUpdateCartOperation>({
		query: editCartItemMutation,
		cache: "no-store",
		variables: { cartId, lines: [{ id: lineId, merchandiseId: variantId, quantity }] },
	});

	const updatedCart = reshapeCart(res.body.data.cartLinesUpdate.cart);

	const newQuantity = getLineQuantity(updatedCart, variantId);
	const actuallyAdded = newQuantity - previousQuantity;

	const decremente = previousQuantity > quantity;

	return {
		data: {
			cart: updatedCart,
			quantityAdded: actuallyAdded,
		},
		warning: newQuantity < quantity && !decremente ? stockWarningMessage(actuallyAdded) : undefined,
	};
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
