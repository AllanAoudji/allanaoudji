"use server";

import { TAGS } from "../constants";
import { addToCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function addItem(_prevState: unknown, selectedVariantId: string | undefined) {
	let cartId: string | undefined;
	try {
		cartId = (await cookies()).get("cartId")?.value;
	} catch (error) {
		if (error instanceof Error) {
			throw error.message;
		}
		throw new Error("Unknown error occurred while retrieving cart ID from cookies.");
	}

	if (!cartId || !selectedVariantId) {
		return "Error adding item to cart.";
	}

	try {
		await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
		revalidateTag(TAGS.cart, { expire: 0 });
	} catch (error) {
		if (error instanceof Error) {
			throw error.message;
		}
		throw new Error("Unknown error occurred while adding item to cart.");
	}
}
