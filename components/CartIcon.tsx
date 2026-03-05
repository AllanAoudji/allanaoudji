"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import { useCart } from "@/lib/contexts/cart-context";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CartIcon({ className }: Readonly<Props>) {
	const { cart } = useCart();
	const isActiveSegment = useSelectedLayoutSegment();

	useEffect(() => {
		if (!cart) {
			createCartAndSetCookie();
		}
	}, [cart]);

	return (
		<div className={cn(className, "flex h-20 items-center justify-end")}>
			<Link
				className={cn(
					"hover:bg-quaternary hover:text-primary border-quaternary animation relative block border px-8 py-1 text-sm font-bold uppercase",
					{
						"bg-quaternary text-primary": isActiveSegment === "basket",
					},
				)}
				href="/basket"
			>
				<span>panier</span>
				<div className="text-quaternary bg-secondary absolute top-0 right-0 flex h-6 w-6 translate-x-3 -translate-y-3 items-center justify-center rounded-full text-xs">
					<span>{cart ? cart.totalQuantity : "0"}</span>
				</div>
			</Link>
		</div>
	);
}
