"use client";

import { cartReducer } from "../reducers/cartReducer";
import { createContext, use, useCallback, useContext, useMemo, useReducer } from "react";
import Cart from "@/types/cart";
import CartAction from "@/types/cartAction";
import Product from "@/types/product";
import ProductVariant from "@/types/productVariant";
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
	children: React.ReactNode;
	cartPromise: Promise<Cart | undefined>;
};

const cartContext = createContext<CartContextCart | undefined>(undefined);

// cart-context.tsx
export function CartProvider({ children, cartPromise }: Readonly<Props>) {
	const initialCart = use(cartPromise);
	const [cart, dispatch] = useReducer(cartReducer, initialCart);

	const addCartItem = useCallback(
		(product: Product, variant: ProductVariant, quantity: number, realCartLineId?: string) =>
			dispatch({ type: "ADD_ITEM", product, variant, quantity, realCartLineId }),
		[], // ← plus de dépendance sur cart
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
		() => ({ addCartItem, dispatch, cart, removeCartItem, updateCartItem }),
		[addCartItem, cart, removeCartItem, updateCartItem],
	);

	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export function useCart() {
	const context = useContext(cartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}
