import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import { getCollectionProductsQuery, getCollectionsQuery } from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getProductQuery, getProductsQuery } from "./queries/product";
import ShopifyProductOperation from "@/types/ShopifyProductOperation";
import Collection from "@/types/collection";
import { Connection } from "@/types/connection";
import { Product } from "@/types/product";
import ShopifyColelction from "@/types/shopifyCollection";
import { ShopifyCollectionProductsOperation } from "@/types/shopifyCollectionProductsOperation";
import ShopifyCollectionsOperation from "@/types/shopifyCollectionsOperation";
import { shopifyImage } from "@/types/shopifyImage";
import { ShopifyMenu } from "@/types/shopifyMenu";
import { ShopifyMenuOperation } from "@/types/shopifyMenuOperation";
import { ShopifyProduct } from "@/types/shopifyProduct";
import { ShopifyProductsOperation } from "@/types/shopifyProductsOperation";

const domain = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
	: "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;

type ExtractVariables<T> = T extends { variables: infer V } ? V : never;

function removeEdgesAndNode<T>(array: Connection<T>): T[] {
	return array.edges.map(edge => edge?.node);
}

function reshapeImages(images: Connection<shopifyImage>, title: string) {
	const flattened = removeEdgesAndNode(images);

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
		variants: removeEdgesAndNode(variants),
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

function reshapeCollection(collection: ShopifyColelction): Collection | undefined {
	if (!collection) return undefined;
	return {
		...collection,
		path: `/collections/${collection.handle}`,
	};
}

function reshapedCollections(collections: ShopifyColelction[]): Collection[] {
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

	return reshapeProducts(removeEdgesAndNode(res.body.data.products));
}

export async function getCollections(): Promise<Collection[]> {
	const res = await shopifyFetch<ShopifyCollectionsOperation>({
		cache: "no-store",
		query: getCollectionsQuery,
		tags: [TAGS.collections],
	});

	const shopufyCollections = removeEdgesAndNode(res?.body?.data?.collections);
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
		...reshapedCollections(shopufyCollections).filter(
			collection => !collection.handle.startsWith("hidden"),
		),
	];

	return collections;
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

	return reshapeProducts(removeEdgesAndNode(res.body.data.collection.products));
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
