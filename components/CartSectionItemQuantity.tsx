"use client";

import { useMemo } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { useCartForm } from "@/lib/contexts/cartForm-context";
import { cn } from "@/lib/utils";
import CartSectionItemQuantityButton from "./CartSectionItemQuantityButton";
import CartSectionItemQuantityDeleteButton from "./CartSectionItemQuantityDeleteButton";
import CartItem from "@/types/cartItem";

type Props = {
	className?: string;
	item: CartItem;
};

const SIZE = 10;

export default function CartSectionItemQuantity({ className, item }: Readonly<Props>) {
	const { updateCartItem } = useCart();
	const { productPending } = useCartForm();

	const isPending = useMemo(() => {
		return !!productPending && productPending.isPending;
	}, [productPending]);

	return (
		<div className={cn("flex items-center gap-4", className)}>
			<div className="bg-primary flex border-2">
				<CartSectionItemQuantityButton
					isPending={isPending}
					item={item}
					optimisticUpdate={updateCartItem}
					size={SIZE}
					type="minus"
				/>
				<div
					className={cn(`flex h-${SIZE} w-${SIZE} items-center justify-center`, {
						"opacity-50": isPending,
					})}
				>
					{item.quantity}
				</div>
				<CartSectionItemQuantityButton
					isPending={isPending}
					item={item}
					optimisticUpdate={updateCartItem}
					size={SIZE}
					type="plus"
				/>
			</div>
			<CartSectionItemQuantityDeleteButton
				isPending={isPending}
				item={item}
				optimisticUpdate={updateCartItem}
			/>
		</div>
	);
}
