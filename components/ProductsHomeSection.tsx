import { getLatestProducts } from "@/lib/shopify";
import ImageContainer from "./ImageContainer";
import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";
import Product from "@/types/product";

export default async function ProductsHomeSection() {
	let products: Product[];
	try {
		products = await getLatestProducts();
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
