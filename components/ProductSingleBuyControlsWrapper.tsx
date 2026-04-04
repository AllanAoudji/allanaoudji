import { getProductVariantsInventory } from "@/lib/shopify/utils/shopifyAdminFetch";
import ProductSingleBuyControls from "./ProductSingleBuyControls";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default async function ProductSingleBuyControlsWrapper({
	className,
	product,
}: Readonly<Props>) {
	const variantsInventory = await getProductVariantsInventory(product.id);

	return (
		<ProductSingleBuyControls
			className={className}
			product={product}
			variantsInventory={variantsInventory}
		/>
	);
}
