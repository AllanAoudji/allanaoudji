"use client";

import { createContext, useContext, useMemo } from "react";
import Collection from "@/types/collection";
import Product from "@/types/product";
import { DiscountNode } from "@/types/shopifyDiscount";

type LocalShopifyContext = {
	collections: Collection[];
	discountNodes: DiscountNode[];
	popularProducts: Product[];
};
type Props = {
	children: React.ReactNode;
	initialCollections: Collection[];
	initialDiscountNodes: DiscountNode[];
	initialPopularProducts: Product[];
};

const localShopifyContext = createContext<LocalShopifyContext | undefined>(undefined);

export function LocalShopifyProvider({
	children,
	initialCollections,
	initialDiscountNodes,
	initialPopularProducts,
}: Readonly<Props>) {
	const value = useMemo(
		() => ({
			collections: initialCollections,
			discountNodes: initialDiscountNodes,
			popularProducts: initialPopularProducts,
		}),
		[initialCollections, initialDiscountNodes, initialPopularProducts],
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
