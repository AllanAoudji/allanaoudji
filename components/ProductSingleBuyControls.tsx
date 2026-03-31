"use client";

import { useCallback, useEffect } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { useProduct } from "@/lib/contexts/product-context";
import useProductSingleQuantity from "@/lib/hooks/useProductSingleQuantity";
import useProductSingleSelectedVariant from "@/lib/hooks/useProductSingleSelectedVariant";
import { cn } from "@/lib/utils";
import FreeDelivery from "./FreeDelivery";
import ProductSingleBuyControlsAddButton from "./ProductSingleBuyControlsAddButton";
import ProductSingleBuyControlsCallbackMessage from "./ProductSingleBuyControlsCallbackMessage";
import ProductSingleBuyControlsInventory from "./ProductSingleBuyControlsInventory";
import ProductSingleBuyControlsQuantityButtons from "./ProductSingleBuyControlsQuantityButtons";
import ProductSingleBuyControlsStock from "./ProductSingleBuyControlsStock";
import ProductSingleBuyControlsVariantSelector from "./ProductSingleBuyControlsVariantSelector";
import ShippingPolicyLink from "./ShippingPolicyLink";
import VariantInventory from "@/types/VariantInventory";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
	variantsInventory: VariantInventory[];
};

export default function ProductSingleBuyControls({
	className,
	product,
	variantsInventory,
}: Readonly<Props>) {
	const { variants } = product;

	const { state } = useProduct();
	const { addItem, resetProductMessage } = useCartActions();

	const { finalVariant, finalVariantInventory } = useProductSingleSelectedVariant({
		state,
		variants,
		variantsInventory,
	});

	const {
		decrementQuantity,
		disableDecrementQuantity,
		disableIncrementQuantity,
		finalQuantity,
		incrementQuantity,
		onBlurQuantity,
		onChangeQuantity,
		quantity,
		resetQuantity,
	} = useProductSingleQuantity({ variants, finalVariantInventory });

	const cartAction = useCallback(() => {
		if (!finalVariant) return;
		resetQuantity();
		addItem(finalVariant, product, finalQuantity);
	}, [finalQuantity, finalVariant, product, resetQuantity, addItem]);

	const onVariantClick = useCallback(() => {
		resetQuantity();
	}, [resetQuantity]);

	useEffect(() => {
		return () => {
			resetProductMessage();
		};
	}, [resetProductMessage]);

	return (
		<div className={cn(className)}>
			<ProductSingleBuyControlsVariantSelector
				className="mt-12"
				onClick={onVariantClick}
				options={product.options}
				variants={product.variants}
			/>

			<ProductSingleBuyControlsStock className="mt-8 mb-1" variant={finalVariant} />
			<div className="flex flex-col gap-2">
				<ProductSingleBuyControlsQuantityButtons
					decrement={decrementQuantity}
					disableDecrement={disableDecrementQuantity}
					disableIncrement={disableIncrementQuantity}
					increment={incrementQuantity}
					onBlur={onBlurQuantity}
					onChange={onChangeQuantity}
					quantity={quantity}
					variant={finalVariant}
				/>
				<ProductSingleBuyControlsAddButton
					cartAction={cartAction}
					className="grow"
					product={product}
					variant={finalVariant}
				/>
			</div>
			<ProductSingleBuyControlsCallbackMessage className="mt-2" finalVariant={finalVariant} />
			<ProductSingleBuyControlsInventory className="mt-2" variantInventory={finalVariantInventory} />
			<div className="mt-10 border-t pt-4">
				<FreeDelivery />
				<ShippingPolicyLink />
			</div>
		</div>
	);
}
