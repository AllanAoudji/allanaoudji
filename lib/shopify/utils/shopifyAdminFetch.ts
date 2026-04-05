import { getCollectionsQuery } from "../queries/collection";
import { getDiscountsQuery } from "../queries/discount";
import { getProductVariantsInventoryQuery } from "../queries/product";
import * as Sentry from "@sentry/nextjs";
import "server-only";
import {
	DEFAULT_COLLECTION_IMAGE,
	ERROR_CODE,
	SHOPIFY_GRAPHQL_API_ENDPOINT,
	TAGS,
} from "@/lib/constants";
import { isShopifyError } from "@/lib/type-guards";
import {
	ensureEndWithout,
	ensureStartWith,
	removeEdgesAndNodes,
	reshapeCollections,
} from "@/lib/utils";
import VariantInventory from "@/types/VariantInventory";
import Collection from "@/types/collection";
import ExtractVariables from "@/types/extractVariables";
import { DiscountNode } from "@/types/shopifyDiscount";
import {
	ShopifyCollectionsOperation,
	ShopifyDiscountsQueryOperation,
	ShopifyVariantsInventoryQueryOperation,
} from "@/types/shopifyOperations";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(ensureEndWithout(process.env.SHOPIFY_STORE_DOMAIN, "/"), "https://")
	: "";

export async function shopifyAdminFetch<T>({
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
}): Promise<{ status: number; body: T }> {
	try {
		const result = await fetch(`${DOMAIN}/admin/${SHOPIFY_GRAPHQL_API_ENDPOINT}`, {
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
			next: {
				tags: tags ?? [],
				revalidate,
			},
		});
		const body = await result.json();
		if (body.errors) {
			Sentry.captureMessage("Shopify Admin GraphQL error", {
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

		if (!(error instanceof Error && error.message === ERROR_CODE.SHOPIFY_API_ERROR)) {
			Sentry.captureException(error, {
				extra: { context: "Unexpected error in shopifyFetch", query },
			});
		}

		throw new Error(`admin: ${ERROR_CODE.SHOPIFY_API_ERROR}`);
	}
}

export async function getCollections(): Promise<Collection[]> {
	const res = await shopifyAdminFetch<ShopifyCollectionsOperation>({
		query: getCollectionsQuery,
		revalidate: 60 * 60 * 24,
		tags: [TAGS.collections],
	});

	const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
	const collections: Collection[] = [
		{
			handle: "",
			title: "Tous les articles",
			description: "Tous les articles",
			seo: {
				title: "Tous les articles",
				description: "Tous les articles",
			},
			path: "/collections",
			updatedAt: "",
			image: DEFAULT_COLLECTION_IMAGE,
			productsCount: {
				count: 1,
			},
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
		revalidate: 60 * 10,
		tags: [TAGS.discounts],
	});

	return res.body.data.discountNodes.edges.map(edge => edge.node);
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
