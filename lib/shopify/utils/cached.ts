import { getCollection, getProduct } from "..";
import { unstable_cache } from "next/cache";
import { TAGS } from "@/lib/constants";

export const getCachedCollection = unstable_cache(
	async (handle: string) => getCollection(handle),
	["collection"],
	{ tags: [TAGS.collections], revalidate: 60 * 60 * 24 },
);

export const getCachedProduct = unstable_cache(
	async (handle: string) => getProduct(handle),
	["product"],
	{ tags: [TAGS.products], revalidate: 60 * 60 * 24 },
);
