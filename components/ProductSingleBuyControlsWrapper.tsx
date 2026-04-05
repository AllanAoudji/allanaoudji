import * as Sentry from "@sentry/nextjs";
import { Suspense } from "react";
import { getProductVariantsInventory } from "@/lib/shopify/utils/shopifyAdminFetch";
import ProductSingleBuyControls from "./ProductSingleBuyControls";
import SkeletonProductSingleBuyControlsWrapper from "./SkeletonProductSingleBuyControlsWrapper";
import VariantInventory from "@/types/VariantInventory";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

async function BuyControls({ className, product }: Props) {
	let variantsInventory: VariantInventory[] = [];

	try {
		variantsInventory = await getProductVariantsInventory(product.id);
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "BuyControls", productId: product.id },
		});
	}

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
