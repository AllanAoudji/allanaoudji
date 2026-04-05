import { Suspense } from "react";
import { getProductVariantsInventory } from "@/lib/shopify/utils/shopifyAdminFetch";
import ProductSingleBuyControls from "./ProductSingleBuyControls";
import SkeletonProductSingleBuyControlsWrapper from "./SkeletonProductSingleBuyControlsWrapper";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

// Composant interne qui fetch l'inventaire — isolé pour que Suspense
// puisse l'intercepter sans bloquer le reste de la page produit.
async function BuyControls({ className, product }: Props) {
	const variantsInventory = await getProductVariantsInventory(product.id);

	return (
		<ProductSingleBuyControls
			className={className}
			product={product}
			variantsInventory={variantsInventory}
		/>
	);
}

export default function ProductSingleBuyControlsWrapper({ className, product }: Props) {
	return (
		<Suspense fallback={<SkeletonProductSingleBuyControlsWrapper />}>
			<BuyControls className={className} product={product} />
		</Suspense>
	);
}
