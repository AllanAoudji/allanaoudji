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
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 1000;

export async function shopifyAdminFetch<T>(
	{
		headers,
		query,
		revalidate = 60 * 60,
		tags,
		variables,
		noCache = false,
	}: {
		headers?: HeadersInit;
		query: string;
		revalidate?: number;
		tags?: string[];
		variables?: ExtractVariables<T>;
		noCache?: boolean;
	},
	retries = MAX_RETRIES,
): Promise<{ status: number; body: T }> {
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
		next: noCache ? { revalidate: 0 } : { revalidate, tags: tags ?? [] },
	};

	const isLastRetry = retries === 0;
	const retryAttempt = MAX_RETRIES - retries;

	let result: Response;

	try {
		result = await fetch(`${DOMAIN}/admin/${SHOPIFY_GRAPHQL_API_ENDPOINT}`, fetchOptions);
	} catch (networkError) {
		const message = networkError instanceof Error ? networkError.message : String(networkError);

		Sentry.captureException(networkError, {
			level: isLastRetry ? "error" : "warning",
			tags: {
				retry_attempt: retryAttempt,
				is_last_retry: isLastRetry,
				shopify_error_type: "network",
			},
			extra: { context: "shopifyAdminFetch: network error", query, variables },
		});

		if (!isLastRetry) {
			await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
			return shopifyAdminFetch({ headers, query, revalidate, tags, variables, noCache }, retries - 1);
		}

		throw new Error(`${ERROR_CODE.SHOPIFY_API_ERROR}: network error — ${message}`);
	}

	if (!result.ok) {
		const text = await result.text().catch(() => "(unreadable body)");
		const canRetry = !isLastRetry && result.status >= 500;

		Sentry.captureMessage("shopifyAdminFetch: HTTP error", {
			level: canRetry ? "warning" : "error",
			tags: {
				retry_attempt: retryAttempt,
				is_last_retry: isLastRetry,
				shopify_error_type: "http",
				http_status: result.status,
			},
			extra: { status: result.status, body: text, query, variables },
		});

		if (canRetry) {
			await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
			return shopifyAdminFetch({ headers, query, revalidate, tags, variables, noCache }, retries - 1);
		}

		throw new Error(`${ERROR_CODE.SHOPIFY_API_ERROR}: HTTP ${result.status}`);
	}

	let body: T;

	try {
		body = await result.json();
	} catch (parseError) {
		Sentry.captureException(parseError, {
			level: "error",
			tags: {
				shopify_error_type: "parse",
			},
			extra: { context: "shopifyAdminFetch: JSON parse error", query, variables },
		});
		throw new Error(`${ERROR_CODE.SHOPIFY_API_ERROR}: invalid JSON response`);
	}

	if ((body as { errors?: unknown }).errors) {
		const errors = (body as { errors: unknown }).errors;

		Sentry.captureMessage("shopifyAdminFetch: GraphQL errors", {
			level: "error",
			tags: {
				shopify_error_type: "graphql",
			},
			extra: { errors, query, variables },
		});

		throw new Error(`${ERROR_CODE.SHOPIFY_API_ERROR}: GraphQL — ${JSON.stringify(errors)}`);
	}

	return { status: result.status, body };
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
		noCache: true,
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
