import * as Sentry from "@sentry/nextjs";
import { getLatestProducts } from "@/lib/shopify";
import ImageContainer from "./ImageContainer";
import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";
import Product from "@/types/product";

type Props = {
	className?: string;
};

export default async function ProductsHomeSection({ className }: Readonly<Props>) {
	let products: Product[];
	try {
		products = await getLatestProducts();
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to fetch latest products" },
		});
		throw error;
	}

	if (!products.length) {
		return null;
	}

	return (
		<ProductsHomeSectionContainer className={className}>
			{products.map(product => (
				<ImageContainer image={product.featuredImage} key={product.id} priority={true} ratio="3/4" />
			))}
		</ProductsHomeSectionContainer>
	);
}
