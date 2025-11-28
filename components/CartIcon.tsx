"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import { useCart } from "@/lib/contexts/cart-context";
import { cn } from "@/lib/utils";

export default function CartIcon() {
	const { cart } = useCart();
	const isActiveSegment = useSelectedLayoutSegment();

	useEffect(() => {
		if (!cart) {
			createCartAndSetCookie();
		}
	}, [cart]);

	return (
		<Link
			href="/basket"
			className={cn(
				"hover:bg-quaternary hover:text-primary border-quaternary relative block rounded-lg border-2 px-4 transition-all duration-200",
				{
					"bg-quaternary text-primary": isActiveSegment === "basket",
				},
			)}
		>
			<span>panier</span>
			<div className="text-quaternary bg-secondary absolute top-0 right-0 flex h-6 w-6 translate-x-3 -translate-y-3 items-center justify-center rounded-full text-xs">
				<span>{cart ? cart.totalQuantity : "0"}</span>
			</div>
		</Link>
	);
}
