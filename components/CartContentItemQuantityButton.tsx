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
	disabled?: boolean;
};

export default function CartContentItemQuantityButton({
	className = "",
	item,
	type,
	disabled = false,
}: Readonly<Props>) {
	const { decrementItem, incrementItem, isCartPending, resetCartMessage } = useCartActions();

	const iconType = useMemo(() => {
		if (type === "plus") return "plus";
		if (item.quantity === 1) return "delete";
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

	const isDisabled = disabled || isCartPending;

	return (
		<button
			aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
			className={cn("group", { "cursor-not-allowed opacity-50": isDisabled }, className)}
			disabled={isDisabled}
			onClick={handleAction}
			type="button"
		>
			<div
				className={cn(
					"flex h-6 w-6 origin-center items-center justify-center transition-transform duration-500",
					{
						"group-hover:rotate-180": !isDisabled,
						"cursor-progress": isDisabled,
					},
				)}
			>
				<QuantityIcon type={iconType} size="small" />
			</div>
		</button>
	);
}
