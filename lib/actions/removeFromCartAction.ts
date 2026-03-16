"use server";

import { TAGS } from "../constants";
import { getCart, removeFromCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import createCartAndSetCookie from "./createCartAndSetCookie";
import ActionReponse from "@/types/actionResponse";
import CartItem from "@/types/cartItem";
import RemoveActionFromCartActionData from "@/types/removeFromCartActionData";

export async function removeFromCartAction(
	merchandiseId: string,
): Promise<ActionReponse<RemoveActionFromCartActionData>> {
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

	let cartId = cookieStore.get("cartId")?.value;
	if (!cartId) {
		try {
			cartId = await createCartAndSetCookie();
		} catch (error) {
			if (error instanceof Error) {
				return {
					message: error.message,
					type: "error",
				};
			}
			return {
				message: "Unknown error occurred while retrieving cart ID from cookies.",
				type: "error",
			};
		}
	}

	let cartItem: CartItem | undefined;
	try {
		const cart = await getCart(cartId);
		if (!cart) {
			return {
				message: "Cart not found.",
				type: "error",
			};
		}
		cartItem = cart.lines.find(line => line.merchandise.id === merchandiseId);

		if (!cartItem || !cartItem.id) {
			return {
				message: "Item not found in cart.",
				type: "error",
			};
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: error.message,
				type: "error",
			};
		}
		return {
			message: "Unknown error occurred while removing item from cart.",
			type: "error",
		};
	}

	try {
		await removeFromCart(cartId, [cartItem.id]);
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: error.message,
				type: "error",
			};
		}
		return {
			message: "Unknown error occurred while removing item to cart.",
			type: "error",
		};
	}

	revalidateTag(TAGS.cart, { expire: 0 });

	return {
		data: {
			cartItem,
		},
		type: "success",
	};
}
