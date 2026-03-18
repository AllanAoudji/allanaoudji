"use server";

import { TAGS } from "../constants";
import { addToCart, getCart, removeFromCart, updateCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import createCartAndSetCookie from "./createCartAndSetCookie";
import ActionReponse from "@/types/actionResponse";
import Cart from "@/types/cart";
import CartItem from "@/types/cartItem";
import UpdateCartItemAction from "@/types/updateCartItemAction";

export default async function updateFromCartAction(
	variantId: string,
	type: "plus" | "minus",
): Promise<ActionReponse<UpdateCartItemAction>> {
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
		cartItem = cart.lines.find(line => line.merchandise.id === variantId);
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

	let res: {
		warning?: string;
		data: {
			cart: Cart;
			quantityAdded: number;
		};
	};
	try {
		if (cartItem && cartItem.id) {
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
			} else {
				res = await updateCart(cartId, cartItem.id, variantId, quantity);
			}
		} else {
			res = await addToCart(cartId, variantId, 1);
		}
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
		cartItem: res.data.cart.lines.find(line => line.merchandise.id === variantId),
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
