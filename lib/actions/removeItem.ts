"use server";

import { TAGS } from "../constants";
import { getCart, removeFromCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function removeItem(_prevState: unknown, merchandiseId: string) {
	let cartId: string | undefined;
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
		const cart = await getCart(cartId);
		if (!cart) {
			return "Cart not found.";
		}
		const lineItem = cart.lines.find(line => line.merchandise.id === merchandiseId);

		if (!lineItem || !lineItem.id) {
			return "Item not found in cart.";
		}

		await removeFromCart(cartId, [lineItem.id]);
		revalidateTag(TAGS.cart, { expire: 0 });
	} catch (error) {
		if (error instanceof Error) {
			return `Error removing item from cart: ${error.message}`;
		}
		return "Unknown error occurred while removing item from cart.";
	}
}
