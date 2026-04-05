import { reshapeProduct, reshapeProducts, shopifyFetch } from "..";
import { getProductQuery, getProductsQuery } from "../queries/product";
import { TAGS } from "@/lib/constants";
import { removeEdgesAndNodes } from "@/lib/utils";
import Product from "@/types/product";
import { ShopifyProductOperation, ShopifyProductsOperation } from "@/types/shopifyOperations";
import ShopifyPageInfo from "@/types/shopifyPageInfo";

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
