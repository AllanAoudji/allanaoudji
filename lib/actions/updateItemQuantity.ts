"use server";

import { TAGS } from "../constants";
import { addToCart, getCart, removeFromCart, updateCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function updateItemQuantity(
	_prevState: unknown,
	payload: {
		merchandiseId: string;
		quantity: number;
	},
) {
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

	const { merchandiseId, quantity } = payload;

	try {
		const cart = await getCart(cartId);
		if (!cart) {
			return "Cart not found.";
		}

		const lineItem = cart.lines.find(line => line.merchandise.id === merchandiseId);

		if (lineItem && lineItem.id) {
			if (quantity <= 0) {
				await removeFromCart(cartId, [lineItem.id]);
			} else {
				await updateCart(cartId, [
					{
						id: lineItem.id,
						merchandiseId,
						quantity,
					},
				]);
			}
		} else if (quantity > 0) {
			await addToCart(cartId, [{ merchandiseId, quantity }]);
		}

		revalidateTag(TAGS.cart, { expire: 0 });
	} catch (error) {
		if (error instanceof Error) {
			return `Error updating item quantity in cart: ${error.message}`;
		}
		return "Unknown error occurred while updating item quantity in cart.";
	}
}
