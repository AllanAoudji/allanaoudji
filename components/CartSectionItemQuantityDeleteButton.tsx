"use client";

import { useCallback } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import CartItem from "@/types/cartItem";

type Props = {
	className?: string;
	item: CartItem;
};

export default function CartSectionItemQuantityDeleteButton({ className, item }: Readonly<Props>) {
	const { isPending, removeItem, resetCartMessage } = useCartActions();

	const handleAction = useCallback(() => {
		removeItem(item.merchandise.id);
	}, [item, removeItem]);

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
				onClick={resetCartMessage}
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
