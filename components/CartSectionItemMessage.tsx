"use client";

import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import CartItem from "@/types/cartItem";

type Props = {
	className?: string;
	item: CartItem;
};

export default function CartSectionItemMessage({ className, item }: Readonly<Props>) {
	const { cartMessage } = useCartActions();

	if (!cartMessage || cartMessage.id !== item.merchandise.id) {
		return null;
	}

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<div
				className={cn(
					"flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
					{
						"bg-danger": cartMessage.type === "error",
						"bg-amber-300": cartMessage.type === "warning",
					},
				)}
			>
				<p>!</p>
			</div>
			<div>
				<p className="text-xs">{cartMessage.message}</p>
			</div>
		</div>
	);
}
