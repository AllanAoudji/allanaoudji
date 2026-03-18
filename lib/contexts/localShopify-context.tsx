"use client";

import { createContext, useContext, useMemo } from "react";
import Collection from "@/types/collection";
import Product from "@/types/product";
import { DiscountNode } from "@/types/shopifyDiscount";

type LocalShopifyContext = {
	collections: Collection[];
	discountNode: DiscountNode[];
	popularProducts: Product[];
};
type Props = {
	children: React.ReactNode;
	initialCollection: Collection[];
	initialDiscountNode: DiscountNode[];
	initialPopularProduct: Product[];
};

const localShopifyContext = createContext<LocalShopifyContext | undefined>(undefined);

export function LocalShopifyProvider({
	children,
	initialCollection,
	initialDiscountNode,
	initialPopularProduct,
}: Readonly<Props>) {
	const value = useMemo(
		() => ({
			collections: initialCollection,
			discountNode: initialDiscountNode,
			popularProducts: initialPopularProduct,
		}),
		[initialCollection, initialDiscountNode, initialPopularProduct],
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
