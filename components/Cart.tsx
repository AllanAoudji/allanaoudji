"use client";

import { useCart } from "@/lib/contexts/cart-context";
import CartEmpty from "./CartEmpty";
// import { CartEditItemQuantityButton } from "./CartEditItemQuantityButton";
import CartSection from "./CartSection";

export default function Cart() {
	const { cart } = useCart();

	if (!cart || !cart.lines.length) {
		return <CartEmpty />;
	}

	return <CartSection cart={cart} />;
}
