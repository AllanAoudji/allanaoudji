"use client";

import { useCallback, useMemo } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import QuantityIcon from "./QuantityIcon";
import CartItem from "@/types/cartItem";
import UpdateCartType from "@/types/updateCartType";

type Props = {
	className?: string;
	item: CartItem;
	type: Exclude<UpdateCartType, "delete">;
};

export default function CartSectionItemQuantityButton({
	className = "",
	item,
	type,
}: Readonly<Props>) {
	const { decrementItem, incrementItem, isPending, resetCartMessage } = useCartActions();

	const iconType = useMemo(() => {
		if (type === "plus") {
			return "plus";
		}
		if (item.quantity === 1) {
			return "delete";
		}
		return "minus";
	}, [item, type]);

	const handleAction = useCallback(() => {
		if (type === "minus") {
			decrementItem(item.merchandise.id);
		} else {
			incrementItem(item.merchandise.id);
		}
	}, [decrementItem, incrementItem, item, type]);

	return (
		<form action={handleAction} className="group">
			<button
				aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
				className={cn(
					{
						"opacity-50": isPending,
					},
					className,
				)}
				disabled={isPending}
				onClick={resetCartMessage}
				type="submit"
			>
				<div className="flex h-6 w-6 origin-center items-center justify-center transition-transform duration-500 group-hover:rotate-180">
					<QuantityIcon type={iconType} size="small" />
				</div>
			</button>
		</form>
	);
}
