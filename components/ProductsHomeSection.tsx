import { DEFAULT_SORT, SORTING } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import ImageContainer from "./ImageContainer";
import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";
import { Product } from "@/types/product";

export default async function ProductsHomeSection() {
	const { reverse, sortKey } = SORTING.find(item => item.slug === "latest-desc") || DEFAULT_SORT;
	let products: Product[];
	try {
		products = await getProducts({
			first: 4,
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
		<ProductsHomeSectionContainer>
			{products.map(product => (
				<ImageContainer
					image={{
						alt: product.featuredImage.altText || product.title,
						url: product.featuredImage.url,
						width: product.featuredImage.width,
						height: product.featuredImage.height,
						lqip: null,
					}}
					priority={true}
					ratio="3/4"
					key={product.id}
				/>
			))}
		</ProductsHomeSectionContainer>
	);
}
