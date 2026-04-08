"use client";

import { ERROR_CODE } from "../constants";
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
	const collections = useMemo(
		() => initialCollections.filter(c => (c.productsCount?.count ?? 0) > 0),
		[initialCollections],
	);

	const value = useMemo(
		() => ({
			collections,
			discountNodes: initialDiscountNodes,
			popularProducts: initialPopularProducts,
		}),
		[collections, initialDiscountNodes, initialPopularProducts],
	);

	return <localShopifyContext.Provider value={value}>{children}</localShopifyContext.Provider>;
}

export function useLocalShopify() {
	const context = useContext(localShopifyContext);
	if (!context) throw new Error(`localShopifyContext: ${ERROR_CODE.CONTEXT_NOT_FOUND}`);

	return context;
}
