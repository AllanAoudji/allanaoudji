"use client";

import { useEffect, useState } from "react";
import { getProductVariantsInventoryAction } from "@/lib/actions/getProductVariantsInventoryAction";
import ProductSingleBuyControls from "./ProductSingleBuyControls";
import SkeletonProductSingleBuyControlsWrapper from "./SkeletonProductSingleBuyControlsWrapper";
import VariantInventory from "@/types/VariantInventory";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductSingleBuyControlsWrapper({ className, product }: Props) {
	const [variantsInventory, setVariantsInventory] = useState<VariantInventory[] | null>(null);

	useEffect(() => {
		getProductVariantsInventoryAction(product.id).then(setVariantsInventory);
	}, [product.id]);

	if (!variantsInventory) return <SkeletonProductSingleBuyControlsWrapper />;

	return (
		<ProductSingleBuyControls
			className={className}
			product={product}
			variantsInventory={variantsInventory}
		/>
	);
}
