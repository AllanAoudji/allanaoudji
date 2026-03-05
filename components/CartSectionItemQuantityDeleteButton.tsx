"use client";

import { useActionState, useCallback } from "react";
import removeItem from "@/lib/actions/removeItem";
import { cn } from "@/lib/utils";
import CartItem from "@/types/cartItem";
import UpdateCartType from "@/types/updateCartType";

type Props = {
	isPending: boolean;
	item: CartItem;
	optimisticUpdate: (_merchandiseId: string, _updateType: UpdateCartType) => void;
};

export default function CartSectionItemQuantityDeleteButton({
	isPending,
	item,
	optimisticUpdate,
}: Readonly<Props>) {
	const [, formAction] = useActionState(removeItem, null);

	const actionWithVariant = formAction.bind(null, item.merchandise.id);

	const handleAction = useCallback(() => {
		optimisticUpdate(item.merchandise.id, "delete");
		actionWithVariant();
	}, [actionWithVariant, item, optimisticUpdate]);

	return (
		<form action={handleAction}>
			<button
				aria-label="Remove cart item"
				className={cn("uppercase opacity-50", {
					"cursor-pointer opacity-100 hover:underline": !isPending,
				})}
				disabled={isPending}
				type="submit"
			>
				<span>delete</span>
			</button>
		</form>
	);
}
