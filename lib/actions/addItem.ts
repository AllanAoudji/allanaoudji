"use server";

import { TAGS } from "../constants";
import { addToCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import CartItem from "@/types/cartItem";
import MessageCallback from "@/types/messageCallback";

type Payload =
	| {
			quantity?: number;
			selectedVariantId?: string;
			type: "ADD";
	  }
	| {
			type: "RESET";
	  };

export default async function addItem(
	_prevState: unknown,
	actionPayload: Payload,
): Promise<MessageCallback<{
	cartItem?: CartItem;
	quantityAdded?: number;
}> | null> {
	if (actionPayload.type === "RESET") {
		return null;
	}

	let cartId: string | undefined;
	try {
		cartId = (await cookies()).get("cartId")?.value;
	} catch (error) {
		if (error instanceof Error) {
			return {
				data: null,
				message: error.message,
				type: "error",
			};
		}
		return {
			data: null,
			message: "Unknown error occurred while retrieving cart ID from cookies.",
			type: "error",
		};
	}

	if (!cartId || !actionPayload.selectedVariantId || !actionPayload.quantity) {
		return { data: null, message: "Error adding item to cart.", type: "error" };
	}

	try {
		let finalQuantity = actionPayload.quantity;
		if (
			Number.isNaN(actionPayload.quantity) ||
			actionPayload.quantity <= 0 ||
			!Number.isInteger(actionPayload.quantity)
		) {
			finalQuantity = 1;
		}
		const res = await addToCart(cartId, actionPayload.selectedVariantId, finalQuantity);
		revalidateTag(TAGS.cart, { expire: 0 });

		const cartItem = res.data.cart.lines.find(
			line => line.merchandise.id === actionPayload.selectedVariantId,
		);

		return {
			data: {
				cartItem: cartItem ? cartItem : undefined,
				quantityAdded: res.data.quantityAdded,
			},
			message:
				res.warning ||
				`${res.data.quantityAdded} item${res.data.quantityAdded > 1 ? "s" : ""} ajoutés au panier`,
			type: !!res.warning ? "warning" : "success",
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				data: null,
				message: error.message,
				type: "error",
			};
		}
		return {
			data: null,
			message: "Unknown error occurred while adding item to cart.",
			type: "error",
		};
	}
}
