import { getProductRecommendations } from "@/lib/shopify";
import ProductRelatedItem from "./ProductRelatedItem";
import SubTitle from "./SubTitle";

type Props = {
	id: string;
};

export default async function ProductRelated({ id }: Readonly<Props>) {
	const relatedProducts = await getProductRecommendations(id);

	if (!relatedProducts || !relatedProducts.length) {
		return null;
	}

	return (
		<div className="py-8">
			<SubTitle>Related products:</SubTitle>
			<ul className="flex gap-2 overflow-x-auto">
				{relatedProducts.slice(0, 4).map(product => (
					<ProductRelatedItem key={product.id} product={product} />
				))}
			</ul>
		</div>
	);
}
