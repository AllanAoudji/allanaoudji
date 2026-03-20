"use server";

import { TAGS } from "../constants";
import { removeFromCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import RemoveActionFromCartActionData from "@/types/RemoveFromCartActionData";
import ActionReponse from "@/types/actionResponse";
import CartItem from "@/types/cartItem";

export async function removeFromCartAction(
	cartItem: CartItem,
): Promise<ActionReponse<RemoveActionFromCartActionData>> {
	if (!cartItem.id) {
		return {
			message: "Unknown error occurred while removing item.",
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
