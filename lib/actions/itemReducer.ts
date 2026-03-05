"use server";

import { TAGS } from "../constants";
import { addToCart, getCart, removeFromCart, updateCart } from "../shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import Cart from "@/types/cart";
import CartItem from "@/types/cartItem";
import MessageCallback from "@/types/messageCallback";

type Payload =
	| {
			quantity: number;
			id: string;
			type: "ADD";
	  }
	| {
			id: string;
			type: "DELETE";
	  }
	| {
			id: string;
			quantity: number;
			type: "UPDATE";
	  };

export default async function itemReducer(
	_prevState: unknown,
	actionPayload: Payload,
): Promise<
	MessageCallback<{
		cartItem?: CartItem;
		quantityAdded?: number;
		type: "ADD" | "DELETE" | "UPDATE";
	}>
> {
	console.log("test");
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

	if (!cartId) {
		return { data: null, message: "Missing cart ID.", type: "error" };
	}

	if (actionPayload.type === "ADD") {
		try {
			let finalQuantity = actionPayload.quantity;
			if (
				Number.isNaN(actionPayload.quantity) ||
				actionPayload.quantity <= 0 ||
				!Number.isInteger(actionPayload.quantity)
			) {
				finalQuantity = 1;
			}
			const res = await addToCart(cartId, actionPayload.id, finalQuantity);
			revalidateTag(TAGS.cart, { expire: 0 });

			const cartItem = res.data.cart.lines.find(line => line.merchandise.id === actionPayload.id);

			return {
				data: {
					cartItem,
					quantityAdded: res.data.quantityAdded,
					type: actionPayload.type,
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

	let cart: Cart | undefined;
	try {
		cart = await getCart(cartId);
		if (!cart) {
			return { data: null, message: "Cart not found.", type: "error" };
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				data: null,
				message: `Error removing item from cart: ${error.message}`,
				type: "error",
			};
		}
		return {
			data: null,
			message: "Unknown error occurred while removing item from cart.",
			type: "error",
		};
	}
	const lineItem = cart.lines.find(line => line.merchandise.id === actionPayload.id);

	if (actionPayload.type === "DELETE") {
		try {
			if (!lineItem || !lineItem.id) {
				return { data: null, message: "Item not found in cart.", type: "error" };
			}

			await removeFromCart(cartId, [lineItem.id]);
			revalidateTag(TAGS.cart, { expire: 0 });
			return {
				data: {
					cartItem: lineItem,
					type: actionPayload.type,
				},
				message: "supprimé du panier",
				type: "success",
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					data: null,
					message: `Error removing item from cart: ${error.message}`,
					type: "error",
				};
			}
			return {
				data: null,
				message: "Unknown error occurred while removing item from cart.",
				type: "error",
			};
		}
	}

	// TODO:
	// même logic qu'avec ADD
	// Si la quantité > quantité disponible
	// retourne un warning
	try {
		if (lineItem && lineItem.id) {
			if (actionPayload.quantity <= 0) {
				await removeFromCart(cartId, [lineItem.id]);
			} else {
				await updateCart(cartId, [
					{
						id: lineItem.id,
						merchandiseId: actionPayload.id,
						quantity: actionPayload.quantity,
					},
				]);
			}
		} else if (actionPayload.quantity > 0) {
			await addToCart(cartId, actionPayload.id, actionPayload.quantity);
		}

		revalidateTag(TAGS.cart, { expire: 0 });
		return {
			data: {
				cartItem: lineItem,
				type: actionPayload.type,
			},
			message: "update success",
			type: "success",
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				data: null,
				message: `Error removing item from cart: ${error.message}`,
				type: "error",
			};
		}
		return {
			data: null,
			message: "Unknown error occurred while removing item from cart.",
			type: "error",
		};
	}
}
