"use client";

import { IconExclamationMark } from "@tabler/icons-react";
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
		<div className={cn("flex items-center gap-3 border p-3", className)}>
			<div
				className={cn(
					"flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
					{
						"bg-danger": cartMessage.type === "error",
						"bg-warning": cartMessage.type === "warning",
					},
				)}
			>
				<IconExclamationMark
					className={cn({
						"text-primary": cartMessage.type === "error",
						"text-quaternary": cartMessage.type === "warning",
					})}
					size={20}
				/>
			</div>
			<div>
				<p className="text-xs">{cartMessage.message}</p>
			</div>
		</div>
	);
}
