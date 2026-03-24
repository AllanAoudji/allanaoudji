import { getLatestProducts } from "@/lib/shopify";
import ImageContainer from "./ImageContainer";
import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";

export default async function ProductsHomeSection() {
	const products = await getLatestProducts();

	if (!products.length) {
		return null;
	}

	return (
		<ProductsHomeSectionContainer>
			{products.map(product => (
				<ImageContainer
					image={product.featuredImage}
					priority={true}
					ratio="3/4"
					key={product.id}
					className="border-primary border"
				/>
			))}
		</ProductsHomeSectionContainer>
	);
}
