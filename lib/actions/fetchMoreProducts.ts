"use server";

import { getProducts, getCollectionProducts } from "@/lib/shopify";

export async function fetchMoreProducts({
	first = 20,
	handle,
	sortKey,
	reverse,
	searchValue,
	after,
}: {
	first?: number;
	handle?: string;
	sortKey: string;
	reverse: boolean;
	searchValue?: string;
	after?: string;
}) {
	const result = handle
		? await getCollectionProducts({ collection: handle, reverse, sortKey, after, first })
		: await getProducts({ query: searchValue, reverse, sortKey, after, first });

	return result;
}
