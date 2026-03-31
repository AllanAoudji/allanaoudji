"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { computeFinalPrice, getApplicableDiscounts } from "@/lib/util-discount";
import { cn } from "@/lib/utils";
import Price from "./Price";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
	size?: "xs" | "sm";
};

export default function ProductPrice({ className, product, size = "sm" }: Readonly<Props>) {
	const { discountNodes } = useLocalShopify();

	const collectionIds = product.collections.map(c => c.id);
	const originalPrice = parseFloat(product.priceRange.minVariantPrice.amount);
	const discounts = getApplicableDiscounts(discountNodes, product.id, collectionIds);
	const { finalPrice, applied } = computeFinalPrice(originalPrice, discounts);
	const hasDiscount = applied.length > 0;

	return (
		<div className={cn("flex items-baseline gap-2 tracking-wide", className)}>
			{hasDiscount && (
				<Price
					className={cn("text-sm font-bold", {
						"text-xs": size === "xs",
					})}
					price={{
						amount: finalPrice.toString(),
						currencyCode: product.priceRange.minVariantPrice.currencyCode,
					}}
				/>
			)}
			<Price
				className={cn({
					"text-xs line-through opacity-50": hasDiscount,
					"text-sm font-bold": !hasDiscount,
					"text-xs": size === "xs",
				})}
				price={product.priceRange.minVariantPrice}
			/>
		</div>
	);
}
