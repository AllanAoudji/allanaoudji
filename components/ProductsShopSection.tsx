import { DEFAULT_SORT, SORTING } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import Grid from "./Grid";
import ProductsShopSectionItem from "./ProductsShopSectionItem";
import { Product } from "@/types/product";

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

	return (
		<Grid className="col-span-4" type="large">
			{!!searchValue && !products.length && <p>There are no products that match</p>}
			{products.map(product => (
				<ProductsShopSectionItem key={product.id} product={product} />
			))}
		</Grid>
	);
}
