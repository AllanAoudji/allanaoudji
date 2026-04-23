"use server";

import { ERROR_CODE } from "../constants";
import { getCart } from "../shopify";
import * as Sentry from "@sentry/nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import Cart from "@/types/cart";

export async function redirectToCheckout() {
	let cartId: string | undefined;
	let cart: Cart | undefined;

	// TODO: remettre cette ligne en production une fois que le shop sera prêt
	// if (!process.env.NEXT_PUBLIC_SHOP_ENABLED) {
	// 	return ERROR_CODE.INVALID_CART;
	// }

	try {
		cartId = (await cookies()).get("cartId")?.value;
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to read cartId cookie" },
		});
		return ERROR_CODE.UNKNOWN_ERROR;
	}

	if (!cartId) {
		return ERROR_CODE.INVALID_CART;
	}

	try {
		cart = await getCart(cartId);
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to fetch cart", cartId },
		});
		return ERROR_CODE.UNKNOWN_ERROR;
	}

	if (!cart) {
		return ERROR_CODE.INVALID_CART;
	}

	const checkoutUrl = new URL(cart.checkoutUrl);
	checkoutUrl.searchParams.set("return_to", "https://allanaoudji.fr/commande/confirmation");

	redirect(checkoutUrl.toString(), RedirectType.push);
}
