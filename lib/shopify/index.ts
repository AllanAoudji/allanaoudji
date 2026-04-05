import { ERROR_CODE, HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import {
	ensureEndWithout,
	ensureStartWith,
	getLineQuantity,
	removeEdgesAndNodes,
	reshapeCollection,
} from "../utils";
import * as Sentry from "@sentry/nextjs";
import {
	addToCartMutation,
	createCartMutation,
	editCartItemMutation,
	removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { getCollectionProductsQuery, getCollectionQuery } from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
	getLatestProductsQuery,
	getPopularProductsQuery,
	getProductQuery,
	getProductRecommendationsQuery,
	getProductsQuery,
} from "./queries/product";
import ShopifyCart from "@/types/ShopifyCart";
import Cart from "@/types/cart";
import Collection from "@/types/collection";
import Connection from "@/types/connection";
import ExtractVariables from "@/types/extractVariables";
import Product from "@/types/product";
import shopifyImage from "@/types/shopifyImage";
import ShopifyMenu from "@/types/shopifyMenu";
import {
	ShopifyAddToCartOperation,
	ShopifyCartOperation,
	ShopifyCollectionOperation,
	ShopifyCollectionProductsOperation,
	ShopifyCreateCartOperation,
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
} from "@/types/shopifyOperations";
import { ShopifyPage } from "@/types/shopifyPage";
import ShopifyPageInfo from "@/types/shopifyPageInfo";
import ShopifyProduct from "@/types/shopifyProduct";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(ensureEndWithout(process.env.SHOPIFY_STORE_DOMAIN, "/"), "https://")
	: "";

const endpoint = `${DOMAIN}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;

function reshapeCart(cart: ShopifyCart): Cart {
	if (!cart.cost?.totalTaxAmount) {
		cart.cost.totalTaxAmount = { amount: "0.0", currencyCode: "USD" };
	}

	const lines = removeEdgesAndNodes(cart.lines).map(line => ({
		...line,
		merchandise: {
			...line.merchandise,
			product: {
				...line.merchandise.product,
				collections: line.merchandise.product.collections?.edges?.map(e => e.node) ?? [],
			},
		},
	}));

	return { ...cart, lines };
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

export async function shopifyFetch<T>({
	cache = "force-cache",
	headers,
	query,
	revalidate = 60 * 60,
	tags,
	variables,
}: {
	cache?: RequestCache;
	headers?: HeadersInit;
	query: string;
	revalidate?: number;
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
			next: {
				tags: tags ?? [],
				revalidate,
			},
		});
		const body = await result.json();
		if (body.errors) {
			Sentry.captureMessage("Shopify GraphQL error", {
				level: "error",
				extra: {
					errors: body.errors,
					query,
					variables,
				},
			});
			throw new Error(body.errors);
		}
		return {
			status: result.status,
			body,
		};
	} catch (error) {
		if (isShopifyError(error)) {
			Sentry.captureException(error, {
				extra: {
					context: "Shopify API error",
					cause: error.cause?.toString() ?? "unknown",
					status: error.status ?? 500,
					query,
				},
			});
			throw new Error(`${error.cause} ${error.message}`);
		}

		// Ne pas re-logger si c'est déjà une Error qu'on a throwée plus haut
		if (!(error instanceof Error && error.message === ERROR_CODE.SHOPIFY_API_ERROR)) {
			Sentry.captureException(error, {
				extra: { context: "Unexpected error in shopifyFetch", query },
			});
		}

		throw new Error(`last: ${ERROR_CODE.SHOPIFY_API_ERROR}`);
	}
}

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
		cache: "no-store",
	});

	if (!res.body.data.cart) {
		return undefined;
	}

	return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
	const res = await shopifyFetch<ShopifyCollectionOperation>({
		query: getCollectionQuery,
		revalidate: 60 * 60 * 24,
		tags: [TAGS.collections],
		variables: { handle },
	});
	if (!res.body.data.collection) return undefined;

	return reshapeCollection(res.body.data.collection);
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

export async function getLatestProducts(): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyLatestProductsOperation>({
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
		variables: { handle },
	});

	return (
		res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
			title: item.title,
			path: item.url.replace(DOMAIN, "").replace("/collections", "/search").replace("/pages", ""),
		})) || []
	);
}

export async function getPage(handle: string): Promise<ShopifyPage> {
	const res = await shopifyFetch<ShopifyPageOperation>({
		query: getPageQuery,
		variables: { handle },
	});

	return res.body.data.pageByHandle;
}

export async function getPages(): Promise<ShopifyPage[]> {
	const res = await shopifyFetch<ShopifyPagesOperation>({
		query: getPagesQuery,
	});

	return removeEdgesAndNodes(res.body.data.pages);
}

export async function getPopularProducts(): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyPopularProductsOperation>({
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
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: { after, first, query, reverse, sortKey },
	});

	return {
		pageInfo: res.body.data.products.pageInfo,
		products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
	};
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
