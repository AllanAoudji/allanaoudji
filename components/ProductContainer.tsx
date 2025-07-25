import { DEFAULT_SORT, SORTING } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import { convertCurrencyCode } from "@/lib/utils";
import { Product } from "@/types/product";

type Props = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductContainer({ searchParams }: Readonly<Props>) {
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
		<section className="items-gap grid-default">
			{products.map(product => (
				<div key={product.id}>
					<h3 className="font-bold">{product.title}</h3>
					<p>{product.description}</p>
					<p className="font-light">
						{product.priceRange.maxVariantPrice.amount}{" "}
						{convertCurrencyCode(product.priceRange.maxVariantPrice.currencyCode)}
					</p>
				</div>
			))}
		</section>
	);
}
