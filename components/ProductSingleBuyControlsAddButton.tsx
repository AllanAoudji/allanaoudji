"use client";

import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import Product from "@/types/product";

type Props = {
	cartAction: () => void;
	className?: string;
	product: Product;
	selectedVariantId?: string;
};

export default function ProductSingleBuyControlsAddButton({
	cartAction,
	className,
	product,
	selectedVariantId,
}: Readonly<Props>) {
	const { resetProductMessage, isCartPending, isProductPending } = useCartActions();

	const isPending = isCartPending || isProductPending;

	const buttonMessage = isProductPending
		? "Ajout en cours..."
		: product.availableForSale
			? "Ajouter au panier"
			: "Out of stock";

	const disable = !product.availableForSale || isPending || !selectedVariantId;

	return (
		<button
			className={cn("CTA", className, {
				"bg-quaternary/50 cursor-not-allowed!": !product.availableForSale || !selectedVariantId,
				"cursor-progress!": isProductPending,
				"bg-quaternary/50 cursor-not-allowed": isCartPending,
			})}
			disabled={disable}
			onClick={() => {
				resetProductMessage();
				cartAction();
			}}
			type="button"
		>
			{buttonMessage}
		</button>
	);
}
