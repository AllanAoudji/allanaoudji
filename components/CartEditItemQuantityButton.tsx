"use client";

import { useActionState } from "react";
import updateItemQuantity from "@/lib/actions/updateItemQuantity";
import { cn } from "@/lib/utils";
import CartItem from "@/types/cartItem";
import UpdateCartType from "@/types/updateCartType";

type Props = {
	className?: string;
	item: CartItem;
	optimisticUpdate: (_merchandiseId: string, _updateType: UpdateCartType) => void;
	type: Exclude<UpdateCartType, "delete">;
};

export function CartEditItemQuantityButton({
	className = "",
	item,
	type,
	optimisticUpdate,
}: Readonly<Props>) {
	const [message, formAction] = useActionState(updateItemQuantity, null);
	const payload = {
		merchandiseId: item.merchandise.id,
		quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
	};
	const actionWithVariant = formAction.bind(null, payload);

	return (
		<form
			action={() => {
				optimisticUpdate(payload.merchandiseId, type);
				actionWithVariant();
			}}
		>
			<button
				aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
				className={cn("flex h-8 w-8 items-center justify-center border-2 font-bold", className)}
				type="submit"
			>
				{type === "plus" ? "+" : "-"}
			</button>
			<p aria-label="polite" role="status">
				{message}
			</p>
		</form>
	);
}
