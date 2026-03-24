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

export default function CartContentItemQuantityButton({
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
		resetCartMessage();
		if (type === "minus") {
			decrementItem(item);
		} else {
			incrementItem(item);
		}
	}, [decrementItem, incrementItem, item, resetCartMessage, type]);

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
				type="submit"
			>
				<div className="flex h-6 w-6 origin-center items-center justify-center transition-transform duration-500 group-hover:rotate-180">
					<QuantityIcon type={iconType} size="small" />
				</div>
			</button>
		</form>
	);
}
