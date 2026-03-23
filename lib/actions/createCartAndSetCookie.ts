"use server";

import { createCart } from "../shopify";
import { cookies } from "next/headers";
import Cart from "@/types/cart";

export default async function createCartAndSetCookie() {
	let cart: Cart;
	try {
		const [createdCart, cookieStore] = await Promise.all([createCart(), cookies()]);

		cart = createdCart;
		cookieStore.set("cartId", cart.id!);

		return cart.id!;
	} catch (error) {
		if (error instanceof Error) {
			throw error.message;
		}
		throw new Error("An unknown error occurred while creating the cart.");
	}
}
