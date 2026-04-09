import {
	collectionTag,
	ERROR_CODE,
	productTag,
	SHOPIFY_GRAPHQL_API_ENDPOINT,
	TAGS,
} from "../constants";
import { isShopifyError } from "../type-guards";
import {
	ensureEndWithout,
	ensureStartWith,
	getLineQuantity,
	removeEdgesAndNodes,
	reshapeCollection,
	reshapeProductSafe,
	reshapeProductsSafe,
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
import ExtractVariables from "@/types/extractVariables";
import Product from "@/types/product";
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

const stockWarningMessage = (quantityAdded: number): string => {
	if (!quantityAdded) {
		return "Stock indisponible. L'article n'a pas pu être ajouté au panier";
	}
	if (quantityAdded === 1) return "Stock indisponible. Seulement 1 article a été ajouté au panier.";

	return `Stock indisponible. Seulement ${quantityAdded} articles ont été ajouté au panier.`;
};

export async function shopifyFetch<T>(
	{
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
	},
	retries = 1,
): Promise<{ status: number; body: T } | never> {
	try {
		const fetchOptions: RequestInit = {
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
		};

		// ✅ Utilise SOIT cache SOIT revalidate, pas les deux
		if (cache === "no-store" || cache === "no-cache") {
			fetchOptions.cache = cache;
		} else {
			fetchOptions.cache = cache; // "force-cache" par défaut
			fetchOptions.next = {
				tags: tags ?? [],
				revalidate,
			};
		}

		const result = await fetch(endpoint, fetchOptions);
		const body = await result.json();

		if (body.errors) {
			Sentry.captureMessage("Shopify GraphQL error", {
				level: "error",
				extra: { errors: body.errors, query, variables },
			});
			throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
		}

		return { status: result.status, body };
	} catch (error) {
		if (error instanceof Error && error.message === ERROR_CODE.SHOPIFY_API_ERROR) {
			throw error;
		}

		if (retries > 0) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			return shopifyFetch({ cache, headers, query, revalidate, tags, variables }, retries - 1);
		}

		if (isShopifyError(error)) {
			Sentry.captureException(error, {
				extra: {
					context: "Shopify API error",
					cause: error.cause?.toString() ?? "unknown",
					status: error.status ?? 500,
					query,
				},
			});
			throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
		}

		Sentry.captureException(error, {
			extra: { context: "Unexpected error in shopifyFetch", query },
		});

		throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
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
		tags: [TAGS.collections, collectionTag(handle)],
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
		revalidate: 60 * 60 * 24,
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
		products: reshapeProductsSafe(removeEdgesAndNodes(res.body.data.collection.products)),
	};
}

export async function getLatestProducts(): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyLatestProductsOperation>({
		query: getLatestProductsQuery,
		revalidate: 60 * 60 * 24,
		tags: [TAGS.products, TAGS.collections],
		variables: { first: 4 },
	});

	if (!res.body.data.products) {
		return [];
	}

	const products = removeEdgesAndNodes(res.body.data.products);
	return reshapeProductsSafe(products);
}

export async function getMenu(handle: string): Promise<ShopifyMenu[]> {
	const res = await shopifyFetch<ShopifyMenuOperation>({
		query: getMenuQuery,
		revalidate: 60 * 60 * 24 * 7,
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
		revalidate: 60 * 60 * 24,
		tags: [TAGS.products, TAGS.collections],
		variables: { first: 4 },
	});

	const products = removeEdgesAndNodes(res.body.data.products);

	return reshapeProductsSafe(products);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		query: getProductQuery,
		tags: [TAGS.products, productTag(handle)],
		variables: { handle },
	});

	if (!res.body.data.product || !res.body.data.product.publishedAt) {
		return undefined;
	}

	return reshapeProductSafe(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
		query: getProductRecommendationsQuery,
		revalidate: 60 * 60 * 24,
		tags: [TAGS.products],
		variables: { productId },
	});

	return reshapeProductsSafe(res.body.data.productRecommendations);
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
		revalidate: 60 * 60 * 24,
		tags: [TAGS.products],
		variables: { after, first, query, reverse, sortKey },
	});

	return {
		pageInfo: res.body.data.products.pageInfo,
		products: reshapeProductsSafe(removeEdgesAndNodes(res.body.data.products)),
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
