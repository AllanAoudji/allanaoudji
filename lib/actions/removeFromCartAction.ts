"use server";

import { ERROR_CODE, TAGS } from "../constants";
import { removeFromCart } from "../shopify";
import * as Sentry from "@sentry/nextjs";
import { updateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import RemoveActionFromCartActionData from "@/types/RemoveFromCartActionData";
import ActionReponse from "@/types/actionResponse";
import CartItem from "@/types/cartItem";

export async function removeFromCartAction(
	cartItem: CartItem,
): Promise<ActionReponse<RemoveActionFromCartActionData>> {
	if (!cartItem.id) {
		return {
			message: ERROR_CODE.UNKNOWN_ERROR,
			type: "error",
		};
	}

	let cookieStore: ReadonlyRequestCookies;
	try {
		cookieStore = await cookies();
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to read cookie store" },
		});
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

	try {
		await removeFromCart(cartId, [cartItem.id]);
	} catch (error) {
		Sentry.captureException(error, {
			extra: {
				context: "Failed to remove item from cart",
				cartId,
				cartItemId: cartItem.id,
			},
		});
		return {
			message: ERROR_CODE.UNKNOWN_ERROR,
			type: "error",
		};
	}

	updateTag(TAGS.cart);

	return {
		data: { cartItem },
		type: "success",
	};
}
