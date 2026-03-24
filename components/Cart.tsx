"use client";

import { useCart } from "@/lib/contexts/cart-context";
import CartContent from "./CartContent";
import CartEmpty from "./CartEmpty";

export default function Cart() {
	const { cart } = useCart();

	if (!cart || !cart.lines.length) {
		return <CartEmpty />;
	}

	return <CartContent cart={cart} />;
}
