"use client";

import { useCart } from "@/lib/contexts/cart-context";
import { cn } from "@/lib/utils";
import { CartEditItemQuantityButton } from "./CartEditItemQuantityButton";
import CartItem from "@/types/cartItem";

type Props = {
	className?: string;
	item: CartItem;
};

export default function CartUpdateQuantityButton({ className = "", item }: Readonly<Props>) {
	const { updateCartItem } = useCart();

	return (
		<div className={cn("flex items-center", className)}>
			<CartEditItemQuantityButton
				item={item}
				optimisticUpdate={updateCartItem}
				type="minus"
				className="bg-primary rounded-tl-xl rounded-bl-xl"
			/>
			<div className="bg-primary flex h-8 w-16 items-center justify-center border-t-2 border-b-2 font-bold">
				<p>{item.quantity}</p>
			</div>
			<CartEditItemQuantityButton
				item={item}
				optimisticUpdate={updateCartItem}
				type="plus"
				className="bg-primary rounded-tr-xl rounded-br-xl"
			/>
		</div>
	);
}
