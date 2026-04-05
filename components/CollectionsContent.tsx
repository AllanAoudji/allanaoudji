import { notFound } from "next/navigation";
import { DEFAULT_SORT, FETCH_PRODUCTS, SORTING } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";
import { getProducts } from "@/lib/shopify/utils/products";
import CollectionsContentInfiniteScroll from "./CollectionsContentInfiniteScroll";
import EmptyCollection from "./EmptyCollection";
import Product from "@/types/product";
import ShopifyPageInfo from "@/types/shopifyPageInfo";

type Props = {
	handle?: string;
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CollectionsContent({ handle, searchParams }: Readonly<Props>) {
	const { sort, q: searchValue } = searchParams;
	const { sortKey, reverse } = SORTING.find(item => item.slug === sort) || DEFAULT_SORT;

	let res: {
		pageInfo: ShopifyPageInfo;
		products: Product[] | null;
	} | null;

	if (handle) {
		if (handle.startsWith("hidden")) {
			notFound();
		}
		res = await getCollectionProducts({
			collection: handle,
			first: FETCH_PRODUCTS,
			reverse,
			sortKey,
		});
	} else {
		res = await getProducts({
			first: FETCH_PRODUCTS,
			query: typeof searchValue === "string" ? searchValue : undefined,
			reverse,
			sortKey,
		});
	}

	if (!res.products) {
		notFound();
	}

	if (!res.products.length) {
		return <EmptyCollection handle={handle} />;
	}

	return (
		<CollectionsContentInfiniteScroll
			handle={handle}
			hasNextPage={res.pageInfo.hasNextPage}
			initialCursor={res.pageInfo.endCursor}
			initialProducts={res.products}
			reverse={reverse}
			searchValue={searchValue}
			sortKey={sortKey}
		/>
	);
}
