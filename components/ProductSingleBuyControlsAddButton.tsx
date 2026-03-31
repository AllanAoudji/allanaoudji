"use client";

import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import Product from "@/types/product";
import ProductVariant from "@/types/productVariant";

type Props = {
	cartAction: () => void;
	className?: string;
	product: Product;
	variant: ProductVariant | undefined;
};

export default function ProductSingleBuyControlsAddButton({
	cartAction,
	className,
	product,
	variant,
}: Readonly<Props>) {
	const { isCartPending, isProductPending, resetProductMessage } = useCartActions();

	const buttonMessage = isProductPending
		? "Ajout en cours..."
		: product.availableForSale
			? "Ajouter au panier"
			: "Out of stock";

	return (
		<button
			className={cn("CTA", className, {
				"bg-secondary/75! text-primary! cursor-not-allowed!":
					!product.availableForSale || !variant || !variant.availableForSale || isCartPending,
				"cursor-progress!": isProductPending,
			})}
			disabled={
				isCartPending ||
				isProductPending ||
				!product.availableForSale ||
				!variant ||
				!variant.availableForSale
			}
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
