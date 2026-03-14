"use client";

import { useActionState, useCallback } from "react";
import removeItem from "@/lib/actions/removeItem";
import { cn } from "@/lib/utils";
import CartItem from "@/types/cartItem";
import UpdateCartType from "@/types/updateCartType";

type Props = {
	className?: string;
	isPending: boolean;
	item: CartItem;
	optimisticUpdate: (_merchandiseId: string, _updateType: UpdateCartType) => void;
};

export default function CartSectionItemQuantityDeleteButton({
	className,
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
		<form action={handleAction} className={className}>
			<button
				aria-label="Remove cart item"
				className={cn("uppercase opacity-50 transition", {
					"hover:text-danger hover:[&_span]:after:bg-danger cursor-pointer opacity-100 duration-700 hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100":
						!isPending,
					"cursor-not-allowed": isPending,
				})}
				disabled={isPending}
				type="submit"
			>
				<span
					className={cn({
						"after:bg-quaternary after:ease relative py-0.5 transition duration-700 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:transition after:duration-700 after:will-change-transform":
							!isPending,
					})}
				>
					delete
				</span>
			</button>
		</form>
	);
}
