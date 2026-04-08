"use client";

import { addToCartAction } from "../actions/addToCartAction";
import { removeFromCartAction } from "../actions/removeFromCartAction";
import updateFromCartAction from "../actions/updateFromCartAction";
import { ERROR_CODE } from "../constants";
import { formatErrorMessage } from "../utils";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useCart } from "./cart-context";
import { useCartRecovery } from "./cartRecovery-context";
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
	isCartPending: boolean;
	isProductPending: boolean;
	productMessage: CartMessage | null;
	removeItem: (_cartItem: CartItem) => void;
	resetCartMessage: () => void;
	resetProductMessage: () => void;
};

type Props = {
	children: React.ReactNode;
};

const CartActionsContext = createContext<CartActionContextType | undefined>(undefined);

export function CartActionsProvider({ children }: Readonly<Props>) {
	const { addCartItem, cart, dispatch, removeCartItem, updateCartItem } = useCart();
	const { openModal } = useModal();
	const recovery = useCartRecovery();

	const [cartMessage, setCartMessage] = useState<CartMessage | null>(null);
	const [productMessage, setProductMessage] = useState<CartMessage | null>(null);
	const [isCartPending, setIsCartPending] = useState(false);
	const [isProductPending, setIsProductPending] = useState(false);

	const isPendingRef = useRef(false);

	const resetCartMessage = useCallback(() => setCartMessage(null), []);
	const resetProductMessage = useCallback(() => setProductMessage(null), []);

	const addItem = useCallback(
		async (variant: ProductVariant, product: Product, quantity: number) => {
			if (isPendingRef.current) return;
			isPendingRef.current = true;
			setIsProductPending(true);

			let previousLines: CartItem[] = [];

			try {
				previousLines =
					typeof structuredClone !== "undefined"
						? structuredClone(cart?.lines ?? [])
						: JSON.parse(JSON.stringify(cart?.lines ?? []));
				addCartItem(product, variant, quantity);

				const res = await addToCartAction(
					variant.id,
					quantity,
					cart?.lines.find(line => line.merchandise.id === variant.id)?.quantity ?? 0,
				);

				if (res.type === "success") {
					if (res.data?.cartItem?.id) {
						dispatch({
							type: "UPDATE_CART_LINE",
							variantId: variant.id,
							realCartLineId: res.data.cartItem.id,
							realQuantity: res.data.cartItem.quantity,
						});
					}
					if (res.data?.newCartId) {
						recovery?.onCartCreated(res.data.newCartId);
					}
					openModal("cart");
					resetCartMessage();
					resetProductMessage();
				} else if (res.type === "warning") {
					if (res.data.quantityAdded === 0) {
						dispatch({ type: "ROLLBACK_ADD", previousLines });
						setProductMessage({ id: variant.id, message: res.message, type: res.type });
					} else if (res.data.cartItem?.id) {
						openModal("cart");
						dispatch({
							type: "UPDATE_CART_LINE",
							variantId: variant.id,
							realCartLineId: res.data.cartItem.id,
							realQuantity: res.data.cartItem.quantity,
						});
						setCartMessage({
							id: res.data.cartItem.merchandise.id,
							message: res.message,
							type: res.type,
						});
					}
				} else {
					dispatch({ type: "ROLLBACK_ADD", previousLines });
					setProductMessage({
						id: variant.id,
						message: formatErrorMessage(res.message),
						type: res.type,
					});
				}
			} catch (error) {
				dispatch({ type: "ROLLBACK_ADD", previousLines });
				setProductMessage({
					id: variant.id,
					message: formatErrorMessage(error),
					type: "error",
				});
			} finally {
				isPendingRef.current = false;
				setIsProductPending(false);
			}
		},
		[addCartItem, cart, dispatch, openModal, resetCartMessage, resetProductMessage, recovery],
	);

	const decrementItem = useCallback(
		async (cartItem: CartItem) => {
			if (isPendingRef.current) return;

			isPendingRef.current = true;
			setIsCartPending(true);

			let previousLines: CartItem[] = [];

			try {
				previousLines =
					typeof structuredClone !== "undefined"
						? structuredClone(cart?.lines ?? [])
						: JSON.parse(JSON.stringify(cart?.lines ?? []));
				updateCartItem(cartItem.merchandise.id, "minus");

				const res = await updateFromCartAction(cartItem, cartItem.quantity, "minus");

				if (res.type === "success") {
					resetCartMessage();
					resetProductMessage();
				} else {
					dispatch({ type: "ROLLBACK_UPDATE", previousLines });
					setCartMessage({
						id: cartItem.merchandise.id,
						message: res.type === "error" ? formatErrorMessage(res.message) : res.message,
						type: res.type,
					});
				}
			} catch (error) {
				dispatch({ type: "ROLLBACK_UPDATE", previousLines });
				setCartMessage({
					id: cartItem.merchandise.id,
					message: formatErrorMessage(error),
					type: "error",
				});
			} finally {
				isPendingRef.current = false;
				setIsCartPending(false);
			}
		},
		[cart, dispatch, updateCartItem, resetCartMessage, resetProductMessage],
	);

	const incrementItem = useCallback(
		async (cartItem: CartItem) => {
			if (isPendingRef.current) return;

			isPendingRef.current = true;
			setIsCartPending(true);

			let previousLines: CartItem[] = [];

			try {
				previousLines =
					typeof structuredClone !== "undefined"
						? structuredClone(cart?.lines ?? [])
						: JSON.parse(JSON.stringify(cart?.lines ?? []));
				updateCartItem(cartItem.merchandise.id, "plus");

				const res = await updateFromCartAction(cartItem, cartItem.quantity, "plus");

				if (res.type === "success") {
					resetCartMessage();
					resetProductMessage();
				} else {
					dispatch({ type: "ROLLBACK_UPDATE", previousLines });
					setCartMessage({
						id: cartItem.merchandise.id,
						message: res.type === "error" ? formatErrorMessage(res.message) : res.message,
						type: res.type,
					});
				}
			} catch (error) {
				dispatch({ type: "ROLLBACK_UPDATE", previousLines });
				setCartMessage({
					id: cartItem.merchandise.id,
					message: formatErrorMessage(error),
					type: "error",
				});
			} finally {
				isPendingRef.current = false;
				setIsCartPending(false);
			}
		},
		[cart, dispatch, updateCartItem, resetCartMessage, resetProductMessage],
	);

	const removeItem = useCallback(
		async (cartItem: CartItem) => {
			if (isPendingRef.current) return;

			isPendingRef.current = true;
			setIsCartPending(true);

			let previousLines: CartItem[] = [];

			try {
				previousLines =
					typeof structuredClone !== "undefined"
						? structuredClone(cart?.lines ?? [])
						: JSON.parse(JSON.stringify(cart?.lines ?? []));
				removeCartItem(cartItem.merchandise.id);

				const res = await removeFromCartAction(cartItem);

				if (res.type === "success") {
					resetCartMessage();
					resetProductMessage();
				} else {
					dispatch({ type: "ROLLBACK_REMOVE", previousLines });
					setCartMessage({
						id: cartItem.merchandise.id,
						message: res.type === "error" ? formatErrorMessage(res.message) : res.message,
						type: res.type,
					});
				}
			} catch (error) {
				dispatch({ type: "ROLLBACK_REMOVE", previousLines });
				setCartMessage({
					id: cartItem.merchandise.id,
					message: formatErrorMessage(error),
					type: "error",
				});
			} finally {
				isPendingRef.current = false;
				setIsCartPending(false);
			}
		},
		[cart, dispatch, removeCartItem, resetCartMessage, resetProductMessage],
	);

	const value = useMemo(
		() => ({
			addItem,
			cartMessage,
			decrementItem,
			incrementItem,
			isCartPending,
			isProductPending,
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
			isCartPending,
			isProductPending,
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
	if (!context) throw new Error(`carActionsContext: ${ERROR_CODE.CONTEXT_NOT_FOUND}`);
	return context;
}
