"use server";

import { createCart } from "../shopify";
import { cookies } from "next/headers";
import Cart from "@/types/cart";

export default async function createCartAndSetCookie() {
	let cart: Cart;
	try {
		cart = await createCart();

		const cookieStore = await cookies();

		cookieStore.set("cartId", cart.id!);

		return cart.id!;
	} catch (error) {
		if (error instanceof Error) {
			throw error.message;
		}
		throw new Error("An unknown error occurred while creating the cart.");
	}
}
