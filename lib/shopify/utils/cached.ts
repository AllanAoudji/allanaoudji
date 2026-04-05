import { getCollection, getProduct } from "..";
import { unstable_cache } from "next/cache";
import { collectionTag, productTag, TAGS } from "@/lib/constants";

export const getCachedCollection = (handle: string) =>
	unstable_cache(async () => getCollection(handle), [`collection-${handle}`], {
		tags: [TAGS.collections, collectionTag(handle)],
		revalidate: 60 * 60 * 24,
	})();

export const getCachedProduct = (handle: string) =>
	unstable_cache(async () => getProduct(handle), [`product-${handle}`], {
		tags: [TAGS.products, productTag(handle)],
		revalidate: 60 * 60 * 24,
	})();
