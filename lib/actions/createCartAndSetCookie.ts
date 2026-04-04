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
		cookieStore.set("cartId", cart.id!, {
			maxAge: 60 * 60 * 24 * 7, // 7 jours
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});

		return cart.id!;
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to create cart and set cookie" },
		});
		throw new Error(ERROR_CODE.UNKNOWN_ERROR);
	}
}
