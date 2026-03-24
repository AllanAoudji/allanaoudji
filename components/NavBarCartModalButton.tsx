"use client";

import { useCallback, useEffect } from "react";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import { useCart } from "@/lib/contexts/cart-context";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	color?: "dark" | "light";
};

export default function NavBarCartModalButton({ className, color = "dark" }: Readonly<Props>) {
	const { cart } = useCart();
	const { openModal } = useModal();

	const handleClick = useCallback(() => {
		openModal("cart");
	}, [openModal]);

	useEffect(() => {
		if (!cart) {
			createCartAndSetCookie();
		}
	}, [cart]);

	return (
		<div className={cn("h-header flex items-center justify-end", className)}>
			<button
				onClick={handleClick}
				className={cn(
					"text-quaternary h-header cursor-pointer pl-4 text-sm font-bold uppercase",
					"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
					{
						"text-primary": color === "light",
					},
				)}
			>
				<span
					className={cn(
						"relative py-1 transition-opacity duration-300",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
						{
							"after:bg-primary": color === "light",
						},
					)}
				>
					panier <span>({cart ? cart.totalQuantity : "0"})</span>
				</span>
			</button>
		</div>
	);
}
