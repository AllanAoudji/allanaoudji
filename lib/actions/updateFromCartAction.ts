"use server";

import { ERROR_CODE, TAGS } from "../constants";
import { removeFromCart, updateCart } from "../shopify";
import * as Sentry from "@sentry/nextjs";
import { updateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import ActionReponse from "@/types/actionResponse";
import Cart from "@/types/cart";
import CartItem from "@/types/cartItem";
import UpdateCartItemAction from "@/types/updateCartItemAction";

export default async function updateFromCartAction(
	cartItem: CartItem,
	previousQuantity: number,
	type: "plus" | "minus",
): Promise<ActionReponse<UpdateCartItemAction>> {
	if (!cartItem.id) {
		return {
			message: ERROR_CODE.INVALID_CART,
			type: "error",
		};
	}

	let cookieStore: ReadonlyRequestCookies;
	try {
		cookieStore = await cookies();
	} catch {
		return {
			message: ERROR_CODE.UNKNOWN_ERROR,
			type: "error",
		};
	}

	const cartId = cookieStore.get("cartId")?.value;
	if (!cartId) {
		try {
			await createCartAndSetCookie();
		} catch (error) {
			Sentry.captureException(error, {
				extra: { context: "Failed to recreate cart after missing cookie" },
			});
		}
		// Le client va rollback puis SYNC_CART récupère le nouveau cart vide
		return { data: { cartItem }, type: "success" };
	}

	let res: {
		data: {
			cart: Cart;
			quantityAdded: number;
		};
		warning?: string;
	};
	try {
		const quantity = type === "minus" ? cartItem.quantity - 1 : cartItem.quantity + 1;
		if (quantity <= 0) {
			await removeFromCart(cartId, [cartItem.id]);
			updateTag(TAGS.cart);
			return {
				data: { cartItem },
				type: "success",
			};
		}
		res = await updateCart(cartId, cartItem.id, cartItem.merchandise.id, quantity, previousQuantity);
	} catch (error) {
		Sentry.captureException(error, {
			extra: {
				context: "Failed to update cart item",
				cartId,
				cartItemId: cartItem.id,
				merchandiseId: cartItem.merchandise.id,
				type,
			},
		});
		return {
			message: ERROR_CODE.UNKNOWN_ERROR,
			type: "error",
		};
	}

	updateTag(TAGS.cart);

	const data = {
		cartItem: res.data.cart.lines.find(line => line.merchandise.id === cartItem.merchandise.id),
		quantityAdded: res.data.quantityAdded,
	};

	if (res.warning) {
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
