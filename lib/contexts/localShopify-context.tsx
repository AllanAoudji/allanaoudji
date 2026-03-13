"use client";

import { createContext, useContext, useMemo } from "react";
import Collection from "@/types/collection";
import Product from "@/types/product";

type LocalShopifyContext = {
	collections: Collection[];
	popularProducts: Product[];
};
type Props = {
	children: React.ReactNode;
	initialCollection: Collection[];
	initialPopularProduct: Product[];
};

const localShopifyContext = createContext<LocalShopifyContext | undefined>(undefined);

export function LocalShopifyProvider({
	children,
	initialCollection,
	initialPopularProduct,
}: Readonly<Props>) {
	const value = useMemo(
		() => ({ collections: initialCollection, popularProducts: initialPopularProduct }),
		[initialCollection, initialPopularProduct],
	);

	return <localShopifyContext.Provider value={value}>{children}</localShopifyContext.Provider>;
}

export function useLocalShopify() {
	const context = useContext(localShopifyContext);

	if (context === undefined) {
		throw new Error("useCollections must be used within a CollectionsProvider");
	}

	return context;
}
