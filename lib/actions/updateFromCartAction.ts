"use server";

import { TAGS } from "../constants";
import { removeFromCart, updateCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import ActionReponse from "@/types/actionResponse";
import Cart from "@/types/cart";
import CartItem from "@/types/cartItem";
import UpdateCartItemAction from "@/types/updateCartItemAction";

export default async function updateFromCartAction(
	cartItem: CartItem,
	type: "plus" | "minus",
): Promise<ActionReponse<UpdateCartItemAction>> {
	if (!cartItem.id) {
		return {
			message: "Item not found in cart.",
			type: "error",
		};
	}

	let cookieStore: ReadonlyRequestCookies;
	try {
		cookieStore = await cookies();
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: error.message,
				type: "error",
			};
		}
		return {
			message: "Unknown error occurred while retrieving cookies.",
			type: "error",
		};
	}

	const cartId = cookieStore.get("cartId")?.value;
	if (!cartId) {
		return {
			message: "Cart not found.",
			type: "error",
		};
	}

	let res: {
		warning?: string;
		data: {
			cart: Cart;
			quantityAdded: number;
		};
	};
	try {
		const quantity = type === "minus" ? cartItem.quantity - 1 : cartItem.quantity + 1;
		if (quantity <= 0) {
			await removeFromCart(cartId, [cartItem.id]);
			revalidateTag(TAGS.cart, { expire: 0 });
			return {
				data: {
					cartItem,
				},
				type: "success",
			};
		}
		res = await updateCart(cartId, cartItem.id, cartItem.merchandise.id, quantity);
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: error.message,
				type: "error",
			};
		}
		return {
			message: "Unknown error occurred while updating item quantity in cart.",
			type: "error",
		};
	}

	revalidateTag(TAGS.cart, { expire: 0 });

	const data = {
		cartItem: res.data.cart.lines.find(line => line.merchandise.id === cartItem.merchandise.id),
		quantityAdded: res.data.quantityAdded,
	};

	if (!!res.warning) {
		return {
			data,
			message: res.warning,
			type: "warning",
		};
	}

	return {
		data,
		type: "success",
	};
}
