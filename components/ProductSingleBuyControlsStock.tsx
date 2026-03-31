"use client";

import { useMemo, useState, useEffect } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { getLineQuantity } from "@/lib/utils";
import ProductVariant from "@/types/productVariant";

type Props = {
	className?: string;
	variant: ProductVariant | undefined;
};

export default function ProductSingleBuyControlsStock({ className, variant }: Readonly<Props>) {
	const { cart } = useCart();

	const [mounted, setMounted] = useState(false);

	const itemInCart = useMemo(() => {
		return !!variant && !!cart ? getLineQuantity(cart, variant.id) : undefined;
	}, [cart, variant]);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className={className}>
			<span className="mb-1 text-sm">
				Quantité{mounted && !!itemInCart && ` (${itemInCart} dans le panier)`}
			</span>
		</div>
	);
}
