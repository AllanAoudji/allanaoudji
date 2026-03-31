"use client";

import React, { createContext, useContext } from "react";

type CartRecoveryContextType = {
	onCartCreated: (_cartId: string) => void;
};
type Props = {
	children: React.ReactNode;
	onCartCreated: (_cartId: string) => void;
};

const CartRecoveryContext = createContext<CartRecoveryContextType | undefined>(undefined);

export function CartRecoveryProvider({ children, onCartCreated }: Readonly<Props>) {
	return (
		<CartRecoveryContext.Provider value={{ onCartCreated }}>{children}</CartRecoveryContext.Provider>
	);
}

export function useCartRecovery() {
	return useContext(CartRecoveryContext);
}
