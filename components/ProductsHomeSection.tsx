import { getLatestProducts } from "@/lib/shopify";
import ImageContainer from "./ImageContainer";
import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";

type Props = {
	className?: string;
};

export default async function ProductsHomeSection({ className }: Readonly<Props>) {
	const products = await getLatestProducts();

	if (!products.length) {
		return null;
	}

	return (
		<ProductsHomeSectionContainer className={className}>
			{products.map(product => (
				<ImageContainer
					className="border-primary border"
					image={product.featuredImage}
					key={product.id}
					priority={true}
					ratio="3/4"
				/>
			))}
		</ProductsHomeSectionContainer>
	);
}
