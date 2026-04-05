import { getCollection, getProduct } from "..";
import { unstable_cache } from "next/cache";
import { TAGS } from "@/lib/constants";

// no-store sur les fetches internes : unstable_cache gère le cache,
// force-cache en dessous crée un conflit pendant le build.

export const getCachedProduct = unstable_cache(
	async (handle: string) => getProduct(handle, "no-store"),
	["product"],
	{ tags: [TAGS.products], revalidate: 60 * 60 * 24 },
);

export const getCachedCollection = unstable_cache(
	async (handle: string) => getCollection(handle, "no-store"),
	["collection"],
	{ tags: [TAGS.collections], revalidate: 60 * 60 * 24 },
);
