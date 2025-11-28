"use client";

import { createContext, use, useCallback, useContext, useMemo, useOptimistic } from "react";
import Cart from "@/types/cart";
import CartItem from "@/types/cartItem";
import Product from "@/types/product";
import ProductVariant from "@/types/productVariant";
import UpdateCartType from "@/types/updateCartType";

type CartAction =
	| { type: "UPDATE_ITEM"; payload: { merchandiseId: string; updateType: UpdateCartType } }
	| { type: "ADD_ITEM"; payload: { variant: ProductVariant; product: Product } };
type CartContextCart = {
	cart: Cart | undefined;
	updateCartItem: (_merchandiseId: string, _updateType: UpdateCartType) => void;
	addCartItem: (_variant: ProductVariant, _product: Product) => void;
};
type Props = {
	children: React.ReactNode;
	cartPromise: Promise<Cart | undefined>;
};

const cartContext = createContext<CartContextCart | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
	return (Number(price) * quantity).toString();
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
	const currentCart = state || createEmptyCart();

	switch (action.type) {
		case "UPDATE_ITEM": {
			const { merchandiseId, updateType } = action.payload;
			const updatedLines = currentCart.lines
				.map(item =>
					item.merchandise.id === merchandiseId ? updateReducerCartItem(item, updateType) : item,
				)
				.filter(Boolean) as CartItem[];
			if (updatedLines.length === 0) {
				return {
					...currentCart,
					lines: [],
					totalQuantity: 0,
					cost: {
						...currentCart.cost,
						totalAmount: {
							...currentCart.cost.totalAmount,
							amount: "0.00",
						},
					},
				};
			}
			return { ...currentCart, ...updatedCartTotals(updatedLines), lines: updatedLines };
		}
		case "ADD_ITEM": {
			const { variant, product } = action.payload;
			const existingItem = currentCart.lines.find(item => item.merchandise.id === variant.id);
			const updatedItem = createOrUpdateCartItem(existingItem, variant, product);
			const updatedLines = existingItem
				? currentCart.lines.map(item => (item.merchandise.id === variant.id ? updatedItem : item))
				: [...currentCart.lines, updatedItem];

			return { ...currentCart, ...updatedCartTotals(updatedLines), lines: updatedLines };
		}
		default:
			return currentCart;
	}
}

function createEmptyCart(): Cart {
	return {
		id: undefined,
		checkoutUrl: "",
		totalQuantity: 0,
		lines: [],
		cost: {
			subtotalAmount: { amount: "0.00", currencyCode: "USD" },
			totalAmount: { amount: "0.00", currencyCode: "USD" },
			totalTaxAmount: { amount: "0.00", currencyCode: "USD" },
		},
	};
}

function createOrUpdateCartItem(
	existingItem: CartItem | undefined,
	variant: ProductVariant,
	product: Product,
): CartItem {
	const quantity = existingItem ? existingItem.quantity + 1 : 1;
	const totalAmount = calculateItemCost(quantity, variant.price.amount);

	return {
		id: existingItem?.id,
		quantity,
		cost: {
			totalAmount: {
				amount: totalAmount,
				currencyCode: variant.price.currencyCode,
			},
		},
		merchandise: {
			id: variant.id,
			title: variant.title,
			selectedOptions: variant.selectedOptions,
			product: {
				id: product.id,
				title: product.title,
				handle: product.handle,
				featuredImage: product.featuredImage,
			},
		},
	};
}

function updatedCartTotals(lines: CartItem[]): Pick<Cart, "totalQuantity" | "cost"> {
	const totalAmount = lines
		.reduce((sum, item) => sum + Number(item.cost.totalAmount.amount), 0)
		.toFixed(2);
	const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
	const currencyCode = lines[0]?.cost.totalAmount.currencyCode || "USD";

	return {
		totalQuantity,
		cost: {
			subtotalAmount: { amount: totalAmount.toString(), currencyCode },
			totalAmount: { amount: totalAmount.toString(), currencyCode },
			totalTaxAmount: { amount: "0.00", currencyCode },
		},
	};
}

function updateReducerCartItem(item: CartItem, updateType: UpdateCartType): CartItem | null {
	if (updateType === "delete") return null;
	const newQuantity = updateType === "plus" ? item.quantity + 1 : item.quantity - 1;

	if (newQuantity <= 0) return null;

	const singleitemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
	const newTotalAmount = calculateItemCost(newQuantity, singleitemAmount.toString());

	return {
		...item,
		quantity: newQuantity,
		cost: {
			...item.cost,
			totalAmount: {
				...item.cost.totalAmount,
				amount: newTotalAmount,
			},
		},
	};
}

export function useCart() {
	const context = useContext(cartContext);

	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}

export function CartProvider({ children, cartPromise }: Readonly<Props>) {
	const initialCart = use(cartPromise);
	const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer);

	const updateCartItem = useCallback(
		(merchandiseId: string, updateType: UpdateCartType) => {
			updateOptimisticCart({
				type: "UPDATE_ITEM",
				payload: { merchandiseId, updateType },
			});
		},
		[updateOptimisticCart],
	);

	const addCartItem = useCallback(
		(variant: ProductVariant | undefined, product: Product) => {
			if (!variant) return;
			updateOptimisticCart({
				type: "ADD_ITEM",
				payload: { variant, product },
			});
		},
		[updateOptimisticCart],
	);

	const value = useMemo(
		() => ({
			cart: optimisticCart,
			updateCartItem,
			addCartItem,
		}),
		[optimisticCart, addCartItem, updateCartItem],
	);

	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
