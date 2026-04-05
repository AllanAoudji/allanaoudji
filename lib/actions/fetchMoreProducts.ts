"use server";

import { withMinimumDelay } from "../utils";
import { getCollectionProducts, getProducts } from "@/lib/shopify";

export async function fetchMoreProducts({
	after,
	first = 20,
	handle,
	searchValue,
	sortKey,
	reverse,
}: {
	after?: string;
	first?: number;
	handle?: string;
	searchValue?: string;
	sortKey: string;
	reverse: boolean;
}) {
	const result = await withMinimumDelay(
		handle
			? getCollectionProducts({ after, collection: handle, first, reverse, sortKey })
			: getProducts({ after, first, query: searchValue, reverse, sortKey }),
		1000,
	);

	return result;
}
