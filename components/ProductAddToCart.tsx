"use client";

import { useActionState } from "react";
import addItem from "@/lib/actions/addItem";
import { useCart } from "@/lib/contexts/cart-context";
import { useProduct } from "@/lib/contexts/product-context";
import { cn } from "@/lib/utils";
import Product from "@/types/product";

type Props = {
	product: Product;
};

export default function ProductAddToCart({ product }: Readonly<Props>) {
	const { variants, availableForSale } = product;
	const { addCartItem } = useCart();
	const { state } = useProduct();
	const [message, formAction] = useActionState(addItem, null);
	const variant = variants.find(variant =>
		variant.selectedOptions.every(option => option.value === state[option.name.toLocaleLowerCase()]),
	);
	const defaultVariantId = variants.length === 1 ? variants[0].id : undefined;
	const selectedVariantId = variant?.id || defaultVariantId;
	const actionWithVariant = formAction.bind(null, selectedVariantId);
	const finalVariant = variants.find(variant => variant.id === selectedVariantId)!;

	return (
		<form
			action={() => {
				addCartItem(finalVariant, product);
				actionWithVariant();
			}}
		>
			<button
				disabled={!availableForSale || !selectedVariantId}
				className={cn({
					"cursor-not-allowed bg-gray-400 hover:opacity-50": !availableForSale || !selectedVariantId,
				})}
			>
				{!availableForSale ? "Out of stock" : "Add to cart"}
			</button>
			<p className="sr-only" role="status" aria-label="polite">
				{message}
			</p>
		</form>
	);
}
