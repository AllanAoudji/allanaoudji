import { getProductRecommendations } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import ProductRelatedContainer from "./ProductRelatedContainer";
import ProductRelatedItem from "./ProductRelatedItem";

type Props = {
	className?: string;
	id: string;
};

export default async function ProductRelated({ className, id }: Readonly<Props>) {
	const relatedProducts = await getProductRecommendations(id);

	if (!relatedProducts || !relatedProducts.length) {
		return null;
	}

	return (
		<ProductRelatedContainer className={cn(className)}>
			<ul className="flex gap-2 overflow-x-auto">
				{relatedProducts.slice(0, 3).map(product => (
					<ProductRelatedItem key={product.id} product={product} />
				))}
			</ul>
		</ProductRelatedContainer>
	);
}
