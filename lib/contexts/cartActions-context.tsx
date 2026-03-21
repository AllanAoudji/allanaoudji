"use client";

import { addToCartAction } from "../actions/addToCartAction";
import { removeFromCartAction } from "../actions/removeFromCartAction";
import updateFromCartAction from "../actions/updateFromCartAction";
import { createContext, useCallback, useContext, useMemo, useState, useTransition } from "react";
import { useCart } from "./cart-context";
import { useModal } from "./modal-context";
import CartItem from "@/types/cartItem";
import Product from "@/types/product";
import ProductVariant from "@/types/productVariant";

type CartMessage = {
	id: string;
	type: "warning" | "error";
	message: string;
};
type CartActionContextType = {
	addItem: (_variant: ProductVariant, _product: Product, _quantity: number) => void;
	cartMessage: CartMessage | null;
	decrementItem: (_cartItem: CartItem) => void;
	incrementItem: (_cartItem: CartItem) => void;
	isPending: boolean;
	productMessage: CartMessage | null;
	removeItem: (_cartItem: CartItem) => void;
	resetCartMessage: () => void;
	resetProductMessage: () => void;
};
type Props = {
	children: React.ReactNode;
};

const CartActionsContext = createContext<CartActionContextType | undefined>(undefined);

// ------------------------------
// ---- Context -----------------
// ------------------------------

export function CartActionsProvider({ children }: Readonly<Props>) {
	const { addCartItem, removeCartItem, updateCartItem } = useCart();
	const { openModal } = useModal();
	const [cartMessage, setCartMessage] = useState<CartMessage | null>(null);
	const [productMessage, setProductMessage] = useState<CartMessage | null>(null);

	const [isPending, startTransition] = useTransition();

	const resetCartMessage = useCallback(() => {
		setCartMessage(null);
	}, []);
	const resetProductMessage = useCallback(() => {
		setProductMessage(null);
	}, []);

	const addItem = useCallback(
		(variant: ProductVariant, product: Product, quantity: number) => {
			startTransition(() => {
				addCartItem(product, variant, quantity);
			});

			addToCartAction(variant.id, quantity)
				.then(res => {
					startTransition(() => {
						if (res.type === "success") {
							openModal("cart");
							resetCartMessage();
							resetProductMessage();
							return;
						} else if (res.type === "warning") {
							if (res.data.quantityAdded && res.data.quantityAdded > 0) {
								openModal("cart");
								if (res.data.cartItem && res.data.cartItem.id) {
									setCartMessage({
										id: res.data.cartItem.merchandise.id,
										message: res.message,
										type: res.type,
									});
								}
							} else {
								setProductMessage({
									id: variant.id,
									message: res.message,
									type: res.type,
								});
							}
						} else {
							setProductMessage({
								id: variant.id,
								message: res.message,
								type: res.type,
							});
						}
					});
				})
				.catch(() => {
					startTransition(() => {
						setProductMessage({
							id: variant.id,
							message: "unknown error while adding product to cart.",
							type: "error",
						});
					});
				});
		},
		[addCartItem, openModal, resetCartMessage, resetProductMessage, setProductMessage],
	);

	const decrementItem = useCallback(
		(cartItem: CartItem) => {
			startTransition(() => {
				updateCartItem(cartItem.merchandise.id, "minus");
			});
			updateFromCartAction(cartItem, "minus")
				.then(res => {
					startTransition(() => {
						if (res.type === "warning" || res.type === "error") {
							setCartMessage({
								id: cartItem.merchandise.id,
								message: res.message,
								type: res.type,
							});
						} else {
							resetCartMessage();
							resetProductMessage();
						}
					});
				})
				.catch(() => {
					startTransition(() => {
						setCartMessage({
							id: cartItem.merchandise.id,
							message: "unknown error while adding product to cart.",
							type: "error",
						});
					});
				});
		},
		[resetCartMessage, updateCartItem, resetProductMessage],
	);

	const incrementItem = useCallback(
		(cartItem: CartItem) => {
			startTransition(() => {
				updateCartItem(cartItem.merchandise.id, "plus");
			});
			updateFromCartAction(cartItem, "plus")
				.then(res => {
					startTransition(() => {
						if (res.type === "warning" || res.type === "error") {
							setCartMessage({
								id: cartItem.merchandise.id,
								message: res.message,
								type: res.type,
							});
						} else {
							resetCartMessage();
							resetProductMessage();
						}
					});
				})
				.catch(() => {
					startTransition(() => {
						setCartMessage({
							id: cartItem.merchandise.id,
							message: "unknown error while adding product to cart.",
							type: "error",
						});
					});
				});
		},
		[resetCartMessage, updateCartItem, resetProductMessage],
	);

	const removeItem = useCallback(
		(cartItem: CartItem) => {
			startTransition(() => {
				removeCartItem(cartItem.merchandise.id);
			});

			removeFromCartAction(cartItem)
				.then(res => {
					startTransition(() => {
						if (res.type === "error" || res.type === "warning") {
							setCartMessage({
								id: cartItem.merchandise.id,
								message: res.message,
								type: res.type,
							});
						} else {
							resetCartMessage();
							resetProductMessage();
						}
					});
				})
				.catch(() => {
					startTransition(() => {
						setCartMessage({
							id: cartItem.merchandise.id,
							message: "unknown error while adding product to cart.",
							type: "error",
						});
					});
				});
		},
		[removeCartItem, resetCartMessage, resetProductMessage],
	);

	const value = useMemo(
		() => ({
			addItem,
			cartMessage,
			decrementItem,
			incrementItem,
			isPending,
			productMessage,
			removeItem,
			resetCartMessage,
			resetProductMessage,
		}),
		[
			addItem,
			cartMessage,
			decrementItem,
			incrementItem,
			isPending,
			productMessage,
			removeItem,
			resetCartMessage,
			resetProductMessage,
		],
	);

	return <CartActionsContext.Provider value={value}>{children}</CartActionsContext.Provider>;
}

export function useCartActions() {
	const context = useContext(CartActionsContext);
	if (context === undefined) {
		throw new Error("useCartActions must be used within a CartActionsProvider");
	}
	return context;
}
