import { getDiscountsQuery } from "../queries/discount";
import { getProductVariantsInventoryQuery } from "../queries/product";
import "server-only";
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "@/lib/constants";
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
