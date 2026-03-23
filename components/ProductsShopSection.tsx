import { notFound } from "next/navigation";
import { DEFAULT_SORT, FETCH_PRODUCTS, SORTING } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import ProductsShopSectionInfiniteGrid from "./ProductsShopSectionInfiniteGrid";
import Product from "@/types/product";
import ShopifyPageInfo from "@/types/shopifyPageInfo";

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

	if (handle) {
		res = await getCollectionProducts({
			collection: handle,
			first: FETCH_PRODUCTS,
			reverse,
			sortKey,
		});
	} else {
		res = await getProducts({
			first: FETCH_PRODUCTS,
			reverse,
			query: typeof searchValue === "string" ? searchValue : undefined,
			sortKey,
		});
	}

	if (!res || !res.products || !res.products.length || (!!handle && handle.startsWith("hidden"))) {
		notFound();
	}

	return (
		<ProductsShopSectionInfiniteGrid
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
