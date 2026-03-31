import { getDiscountsQuery } from "../queries/discount";
import { getProductVariantsInventoryQuery } from "../queries/product";
import * as Sentry from "@sentry/nextjs";
import "server-only";
import { ERROR_CODE, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "@/lib/constants";
import { isShopifyError } from "@/lib/type-guards";
import VariantInventory from "@/types/VariantInventory";
import ExtractVariables from "@/types/extractVariables";
import { DiscountNode } from "@/types/shopifyDiscount";
import {
	ShopifyDiscountsQueryOperation,
	ShopifyVariantsInventoryQueryOperation,
} from "@/types/shopifyOperations";

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
			Sentry.captureMessage("Shopify Admin GraphQL error", {
				level: "error",
				extra: {
					errors: body.errors,
					query,
					variables,
				},
			});
			throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
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
			throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
		}

		if (!(error instanceof Error && error.message === ERROR_CODE.SHOPIFY_API_ERROR)) {
			Sentry.captureException(error, {
				extra: { context: "Unexpected error in shopifyFetch", query },
			});
		}

		throw new Error(ERROR_CODE.SHOPIFY_API_ERROR);
	}
}

export async function getDiscount(): Promise<DiscountNode[]> {
	const res = await shopifyAdminFetch<ShopifyDiscountsQueryOperation>({
		query: getDiscountsQuery,
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
