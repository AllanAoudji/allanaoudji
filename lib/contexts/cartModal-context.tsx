"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import CartItem from "@/types/cartItem";
import MessageCallback from "@/types/messageCallback";

type Props = {
	children: React.ReactNode;
};
type CartModalContextType = {
	cartItem: CartItem | null;
	handleCloseCartModal: () => void;
	handleOpenCartModal: (
		_messageCallback: MessageCallback<{ cartItem?: CartItem; quantityAdded?: number }>,
	) => void;
	isOpenCartModal: boolean;
};

const CartModalContext = createContext<CartModalContextType | undefined>(undefined);

export function CartModalProvider({ children }: Readonly<Props>) {
	const [cartItem, setCartItem] = useState<CartItem | null>(null);
	const [isOpenCartModal, setIsOpenCartModal] = useState<boolean>(false);

	const handleCloseCartModal = useCallback(() => {
		setIsOpenCartModal(false);
		setCartItem(null);
	}, []);

	const handleOpenCartModal = useCallback(
		(messageCallBack: MessageCallback<{ cartItem?: CartItem; quantityAdded?: number }>) => {
			if (
				(messageCallBack.type === "success" || messageCallBack.type === "warning") &&
				messageCallBack.data &&
				messageCallBack.data.cartItem &&
				!!messageCallBack.data.quantityAdded
			) {
				setCartItem(messageCallBack.data.cartItem);
			}
			setIsOpenCartModal(true);
		},
		[],
	);

	const value = useMemo(
		() => ({ cartItem, handleOpenCartModal, handleCloseCartModal, isOpenCartModal }),
		[cartItem, handleOpenCartModal, handleCloseCartModal, isOpenCartModal],
	);

	return <CartModalContext.Provider value={value}>{children}</CartModalContext.Provider>;
}

export function useCartModal() {
	const context = useContext(CartModalContext);
	if (context === undefined) {
		throw new Error("useCartModal must be used within a CartModalProvider");
	}
	return context;
}
