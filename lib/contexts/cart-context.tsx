"use client";

import { getCartAction } from "../actions/getCartAction";
import { ERROR_CODE } from "../constants";
import { cartReducer } from "../reducers/cartReducer";
import * as Sentry from "@sentry/nextjs";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
} from "react";
import Cart from "@/types/cart";
import CartAction from "@/types/cartAction";
import Product from "@/types/product";
import ProductVariant from "@/types/productVariant";
import { DiscountNode } from "@/types/shopifyDiscount";
import UpdateCartType from "@/types/updateCartType";

type CartContextCart = {
	addCartItem: (
		_product: Product,
		_variant: ProductVariant,
		_quantity: number,
		_realCartLineId?: string,
	) => void;
	dispatch: React.Dispatch<CartAction>;
	cart: Cart | undefined;
	removeCartItem: (_merchandiseId: string) => void;
	updateCartItem: (_merchandiseId: string, _updateType: UpdateCartType) => void;
};

type Props = {
	cartId: string | undefined;
	cartPromise: Promise<Cart | undefined>;
	children: React.ReactNode;
	discountNodes: DiscountNode[];
};

const cartContext = createContext<CartContextCart | undefined>(undefined);

export function CartProvider({ cartId, cartPromise, children, discountNodes }: Readonly<Props>) {
	const reducer = useCallback(
		(cart: Cart | undefined, action: CartAction) => cartReducer(cart, action, discountNodes),
		[discountNodes],
	);

	const [cart, dispatch] = useReducer(reducer, undefined);
	const syncedPromiseRef = useRef<Promise<Cart | undefined> | null>(null);

	useEffect(() => {
		if (syncedPromiseRef.current === cartPromise) return;
		syncedPromiseRef.current = cartPromise;

		let cancelled = false;
		cartPromise.then(freshCart => {
			if (!cancelled && freshCart) dispatch({ type: "SYNC_CART", cart: freshCart });
		});
		return () => {
			cancelled = true;
		};
	}, [cartPromise]);

	useEffect(() => {
		if (!cartId) return;
		let cancelled = false;

		const sync = async () => {
			if (document.visibilityState !== "visible") return;
			try {
				const freshCart = await getCartAction(cartId);
				if (!cancelled && freshCart) dispatch({ type: "SYNC_CART", cart: freshCart });
			} catch (error) {
				Sentry.captureException(error, {
					extra: { context: "Failed to sync cart on visibility change", cartId },
				});
			}
		};

		document.addEventListener("visibilitychange", sync);
		return () => {
			cancelled = true;
			document.removeEventListener("visibilitychange", sync);
		};
	}, [cartId]);

	const addCartItem = useCallback(
		(product: Product, variant: ProductVariant, quantity: number, realCartLineId?: string) =>
			dispatch({ type: "ADD_ITEM", product, variant, quantity, realCartLineId }),
		[],
	);

	const removeCartItem = useCallback(
		(merchandiseId: string) => dispatch({ type: "REMOVE_ITEM", merchandiseId }),
		[],
	);

	const updateCartItem = useCallback(
		(merchandiseId: string, updateType: UpdateCartType) =>
			dispatch({ type: "UPDATE_ITEM", merchandiseId, updateType }),
		[],
	);

	const value = useMemo(
		() => ({ addCartItem, cart, dispatch, removeCartItem, updateCartItem }),
		[addCartItem, cart, removeCartItem, updateCartItem],
	);

	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export function useCart() {
	const context = useContext(cartContext);
	if (!context) throw new Error(ERROR_CODE.CONTEXT_NOT_FOUND);
	return context;
}
