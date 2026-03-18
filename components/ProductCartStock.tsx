"use client";

import { useMemo } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { getLineQuantity } from "@/lib/utils";
import ProductVariant from "@/types/productVariant";

type Props = {
	className?: string;
	variant: ProductVariant | undefined;
};

export default function ProductCartStock({ className, variant }: Readonly<Props>) {
	const { cart } = useCart();
	const itemInCart = useMemo(() => {
		return !!variant && !!cart ? getLineQuantity(cart, variant.id) : undefined;
	}, [cart, variant]);

	return (
		<div className={className}>
			<span className={"mb-1 text-sm"}>
				Quantité{!!itemInCart && ` (${itemInCart} dans le panier)`}
			</span>
		</div>
	);
}
