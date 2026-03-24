"use client";

import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import Product from "@/types/product";

type Props = {
	cartAction: () => void;
	className?: string;
	isPending: boolean;
	product: Product;
	selectedVariantId?: string;
};

export default function ProductSingleBuyControlsAddButton({
	cartAction,
	className,
	product,
	isPending,
	selectedVariantId,
}: Readonly<Props>) {
	const { resetProductMessage } = useCartActions();

	const buttonMessage = isPending
		? "Ajout en cours..."
		: product.availableForSale
			? "Ajouter au panier"
			: "Out of stock";

	const disable = !product.availableForSale || isPending || !selectedVariantId;

	return (
		<form action={cartAction} className={cn(className)}>
			<button
				className={cn("CTA", {
					"bg-quaternary/50 cursor-not-allowed!": !product.availableForSale || !selectedVariantId,
					"cursor-progress!": isPending,
				})}
				disabled={disable}
				onClick={resetProductMessage}
				type="submit"
			>
				{buttonMessage}
			</button>
		</form>
	);
}
