"use server";

import { withMinimumDelay } from "../utils";
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
	const result = await withMinimumDelay(
		handle
			? getCollectionProducts({ collection: handle, reverse, sortKey, after, first })
			: getProducts({ query: searchValue, reverse, sortKey, after, first }),
		1000,
	);

	return result;
}
