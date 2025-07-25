import { DEFAULT_SORT, SORTING } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import ProductsShopSectionItem from "./ProductsShopSectionItem";
import { Product } from "@/types/product";

type Props = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsShopSection({ searchParams }: Readonly<Props>) {
	const { sort, q: searchValue } = searchParams;
	const { sortKey, reverse } = SORTING.find(item => item.slug === sort) || DEFAULT_SORT;

	let products: Product[];
	try {
		products = await getProducts({
			query: typeof searchValue === "string" ? searchValue : undefined,
			reverse,
			sortKey,
		});
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	return (
		<section className="items-gap grid-default section-container">
			{!!searchValue && !products.length && <p>There are no products that match</p>}
			{products.map(product => (
				<ProductsShopSectionItem key={product.id} product={product} />
			))}
		</section>
	);
}
