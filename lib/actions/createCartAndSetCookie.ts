"use server";

import { ERROR_CODE } from "../constants";
import { createCart } from "../shopify";
import * as Sentry from "@sentry/nextjs";
import { cookies } from "next/headers";
import Cart from "@/types/cart";

export default async function createCartAndSetCookie() {
	let cart: Cart;
	try {
		const [createdCart, cookieStore] = await Promise.all([createCart(), cookies()]);

		cart = createdCart;
		cookieStore.set("cartId", cart.id!);

		return cart.id!;
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to create cart and set cookie" },
		});
		throw new Error(ERROR_CODE.UNKNOWN_ERROR);
	}
}
