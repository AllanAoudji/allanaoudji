import { redirect } from "next/navigation";
import { DEFAULT_SORT, SORTING } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import Grid from "./Grid";
import ProductLink from "./ProductLink";
import Product from "@/types/product";

type Props = {
	handle?: string;
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsShopSection({ handle, searchParams }: Readonly<Props>) {
	const { sort, q: searchValue } = searchParams;
	const { sortKey, reverse } = SORTING.find(item => item.slug === sort) || DEFAULT_SORT;

	let products: Product[];
	try {
		if (handle) {
			products = await getCollectionProducts({
				collection: handle,
				reverse,
				sortKey,
			});
		} else {
			products = await getProducts({
				query: typeof searchValue === "string" ? searchValue : undefined,
				reverse,
				sortKey,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!products || !products.length || (!!handle && handle.startsWith("hidden"))) {
		redirect("/collections");
	}

	return (
		<Grid>
			{!!searchValue && !products.length && <p>There are no products that match</p>}
			{products.map(product => (
				<ProductLink key={product.id} product={product} />
			))}
		</Grid>
	);
}
