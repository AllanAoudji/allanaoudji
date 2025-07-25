import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import { getMenuQuery } from "./queries/menu";
import { getProductsQuery } from "./queries/product";
import { Connection } from "@/types/connection";
import { Image } from "@/types/image";
import { Product } from "@/types/product";
import { ShopifyMenu } from "@/types/shopifyMenu";
import { ShopifyMenuOperation } from "@/types/shopifyMenuOperation";
import { ShopifyProduct } from "@/types/shopifyProduct";
import { ShopifyProductOperation } from "@/types/shopifyProductOperation";

const domain = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
	: "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;

type ExtractVariables<T> = T extends { variables: infer V } ? V : never;

function removeEdgesAndNode<T>(array: Connection<T>): T[] {
	return array.edges.map(edge => edge?.node);
}

function reshapeImages(images: Connection<Image>, title: string) {
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
	reverse,
	sortKey,
}: {
	query?: string;
	reverse?: boolean;
	sortKey?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: { query, reverse, sortKey },
	});

	return reshapeProducts(removeEdgesAndNode(res.body.data.products));
}
