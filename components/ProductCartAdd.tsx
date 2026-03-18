"use client";

import { useMemo } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import Product from "@/types/product";

type Props = {
	cartAction: () => void;
	className?: string;
	isPending: boolean;
	product: Product;
	selectedVariantId: string;
};

export default function ProductCartAdd({
	cartAction,
	className,
	product,
	isPending,
	selectedVariantId,
}: Readonly<Props>) {
	const { resetProductMessage } = useCartActions();

	const buttonMessage = useMemo(() => {
		if (isPending) {
			return "Ajout en cours...";
		}
		if (product.availableForSale) {
			return "Ajouter au panier";
		}
		return "Out of stock";
	}, [isPending, product]);

	const disable = useMemo(() => {
		return !product.availableForSale || isPending;
	}, [product, isPending]);

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
