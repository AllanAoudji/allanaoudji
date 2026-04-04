"use server";

import * as Sentry from "@sentry/nextjs";
import { updateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import { ERROR_CODE, TAGS } from "@/lib/constants";
import { addToCart } from "@/lib/shopify";
import ActionReponse from "@/types/actionResponse";
import Cart from "@/types/cart";
import UpdateCartItemAction from "@/types/updateCartItemAction";

export async function addToCartAction(
	variantId: string,
	quantity: number,
	previousQuantity: number,
): Promise<ActionReponse<UpdateCartItemAction>> {
	let cookieStore: ReadonlyRequestCookies;

	try {
		cookieStore = await cookies();
	} catch {
		return { message: ERROR_CODE.UNKNOWN_ERROR, type: "error" };
	}

	let cartId = cookieStore.get("cartId")?.value;
	let newCartId: string | undefined;

	if (!cartId) {
		try {
			newCartId = await createCartAndSetCookie();
			cartId = newCartId;
		} catch (error) {
			Sentry.captureException(error, {
				extra: { context: "Failed to create cart" },
			});
			return {
				message: ERROR_CODE.UNKNOWN_ERROR,
				type: "error",
			};
		}
	}

	let finalQuantity = quantity;
	if (Number.isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
		finalQuantity = 1;
	}

	let res: {
		warning?: string;
		data: { cart: Cart; quantityAdded: number };
	};
	try {
		res = await addToCart(cartId, variantId, finalQuantity, previousQuantity);
	} catch (error) {
		Sentry.captureException(error, {
			extra: {
				context: "Failed to add to cart",
				cartId,
				variantId,
				finalQuantity,
			},
		});
		return { message: ERROR_CODE.UNKNOWN_ERROR, type: "error" };
	}

	updateTag(TAGS.cart);

	const data = {
		cartItem: res.data.cart.lines.find(line => line.merchandise.id === variantId),
		quantityAdded: res.data.quantityAdded,
		newCartId,
	};

	if (res.warning) {
		return { data, message: res.warning, type: "warning" };
	}

	return { data, type: "success" };
}
