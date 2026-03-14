"use client";

import { useCallback, useMemo } from "react";
import { useCartForm } from "@/lib/contexts/cartForm-context";
import { cn } from "@/lib/utils";
import CartItem from "@/types/cartItem";
import UpdateCartType from "@/types/updateCartType";

type Props = {
	className?: string;
	isPending: boolean;
	item: CartItem;
	optimisticUpdate: (_merchandiseId: string, _updateType: UpdateCartType) => void;
	type: Exclude<UpdateCartType, "delete">;
};

export default function CartSectionItemQuantityButton({
	className = "",
	isPending,
	item,
	optimisticUpdate,
	type,
}: Readonly<Props>) {
	const { updateAction, setUpdateProductPending } = useCartForm();

	const actionWithVariant = useMemo(() => {
		return updateAction(item.merchandise.id, type === "plus" ? item.quantity + 1 : item.quantity - 1);
	}, [item, type, updateAction]);
	const payload = useMemo(
		() => ({
			merchandiseId: item.merchandise.id,
			quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
		}),
		[item, type],
	);
	const text = useMemo(() => {
		if (type === "plus") {
			return "+";
		}
		if (item.quantity === 1) {
			return "x";
		}
		return "-";
	}, [item, type]);

	const handleAction = useCallback(() => {
		optimisticUpdate(payload.merchandiseId, type);
		actionWithVariant();
	}, [actionWithVariant, payload, optimisticUpdate, type]);
	const handleClick = useCallback(() => {
		if (!isPending) {
			setUpdateProductPending(item.merchandise.id);
		}
	}, [isPending, item, setUpdateProductPending]);

	return (
		<form action={handleAction} className="group">
			<button
				aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
				className={cn(
					{
						"font-normal opacity-50": isPending,
					},
					className,
				)}
				disabled={isPending}
				onClick={handleClick}
				type="submit"
			>
				<div className="flex h-4 w-4 origin-center items-center justify-center transition-transform group-hover:rotate-180">
					<span>{text}</span>
				</div>
			</button>
		</form>
	);
}
