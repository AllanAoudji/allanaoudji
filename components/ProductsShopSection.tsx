import { redirect } from "next/navigation";
import { DEFAULT_SORT, SORTING } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import ProductsShopSectionInfiniteGrid from "./ProductsShopSectionInfiniteGrid";
import Product from "@/types/product";
import ShopifyPageInfo from "@/types/shopifyPageInfo";

const FIRST = 12;

type Props = {
	handle?: string;
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsShopSection({ handle, searchParams }: Readonly<Props>) {
	const { sort, q: searchValue } = searchParams;
	const { sortKey, reverse } = SORTING.find(item => item.slug === sort) || DEFAULT_SORT;

	let res: {
		pageInfo: ShopifyPageInfo;
		products: Product[];
	} | null;
	try {
		if (handle) {
			res = await getCollectionProducts({
				collection: handle,
				first: FIRST,
				reverse,
				sortKey,
			});
		} else {
			res = await getProducts({
				first: FIRST,
				reverse,
				query: typeof searchValue === "string" ? searchValue : undefined,
				sortKey,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!res || !res.products || !res.products.length || (!!handle && handle.startsWith("hidden"))) {
		redirect("/collections");
	}

	return (
		<ProductsShopSectionInfiniteGrid
			first={FIRST}
			initialProducts={res.products}
			initialCursor={res.pageInfo.endCursor}
			hasNextPage={res.pageInfo.hasNextPage}
			handle={handle}
			sortKey={sortKey}
			reverse={reverse}
			searchValue={searchValue}
		/>
	);
}
