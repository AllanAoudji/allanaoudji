import { getProductRecommendations } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import ProductLink from "./ProductLink";
import ProductSingleRelatedContainer from "./ProductSingleRelatedContainer";

type Props = {
	className?: string;
	id: string;
};

export default async function ProductSingleRelated({ className, id }: Readonly<Props>) {
	const relatedProducts = await getProductRecommendations(id);

	if (!relatedProducts || !relatedProducts.length) {
		return null;
	}

	return (
		<ProductSingleRelatedContainer className={cn(className)}>
			<ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{relatedProducts.slice(0, 4).map(product => (
					<ProductLink key={product.id} product={product} />
				))}
			</ul>
		</ProductSingleRelatedContainer>
	);
}
