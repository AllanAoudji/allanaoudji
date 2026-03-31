"use client";

import { useCart } from "@/lib/contexts/cart-context";
import { cn } from "@/lib/utils";
import CartHeaderCloseButton from "./CartHeaderCloseButton";
import ShopDisabled from "./ShopDisabled";

type Props = {
	className?: string;
};

export default function CartHeader({ className }: Readonly<Props>) {
	const { cart } = useCart();

	return (
		<div className={cn("px-4", className)}>
			<div className="flex items-baseline justify-between">
				<CartHeaderCloseButton />
				<div className="h-header flex items-center justify-center">
					<h4 className="text-sm font-bold uppercase">
						Votre panier <span>({cart ? cart.totalQuantity : "0"})</span>
					</h4>
				</div>
			</div>
			<ShopDisabled className="mb-4" />
		</div>
	);
}
