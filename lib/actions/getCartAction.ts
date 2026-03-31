"use server";

import { getCart } from "@/lib/shopify";

export async function getCartAction(cartId: string) {
	return getCart(cartId);
}
