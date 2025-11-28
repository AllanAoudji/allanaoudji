"use server";

import { getCart } from "../shopify";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import Cart from "@/types/cart";

export async function redirectToCheckout() {
	let cartId: string | undefined;
	let cart: Cart | undefined;
	try {
		cartId = (await cookies()).get("cartId")?.value;
	} catch (error) {
		if (error instanceof Error) {
			return error.message;
		}
		return "Unknown error occurred while retrieving cart ID from cookies.";
	}

	if (!cartId) {
		return "Missing cart ID";
	}

	try {
		cart = await getCart(cartId);
	} catch (error) {
		if (error instanceof Error) {
			return error.message;
		}
		return "Error fetching cart ";
	}

	if (!cart) {
		return "Missing cart";
	}

	redirect(cart.checkoutUrl, RedirectType.push);
}
