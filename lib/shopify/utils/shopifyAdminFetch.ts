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

export async function shopifyAdminFetch<T>(
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
): Promise<{ status: number; body: T }> {
	try {
		const fetchOptions: RequestInit = {
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

		const result = await fetch(`${DOMAIN}/admin/${SHOPIFY_GRAPHQL_API_ENDPOINT}`, fetchOptions);
		const body = await result.json();

		if (body.errors) {
			Sentry.captureMessage("Shopify Admin GraphQL error", {
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
			return shopifyAdminFetch({ cache, headers, query, revalidate, tags, variables }, retries - 1);
		}

		if (isShopifyError(error)) {
			Sentry.captureException(error, {
				extra: {
					context: "Shopify Admin API error",
					cause: error.cause?.toString() ?? "unknown",
					status: error.status ?? 500,
					query,
				},
			});
			throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
		}

		Sentry.captureException(error, {
			extra: { context: "Unexpected error in shopifyAdminFetch", query },
		});

		throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
	}
}

export async function getCollections(): Promise<Collection[]> {
	const res = await shopifyAdminFetch<ShopifyCollectionsOperation>({
		query: getCollectionsQuery,
		revalidate: 60 * 60 * 4,
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
		revalidate: 60 * 5,
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
