"use client";

import { createContext, useContext, useMemo } from "react";
import Collection from "@/types/collection";

type CollectionsContext = {
	collections: Collection[];
};
type Props = {
	children: React.ReactNode;
	initialValue: Collection[];
};

const collectionsContext = createContext<CollectionsContext | undefined>(undefined);

export function CollectionsProvider({ children, initialValue }: Readonly<Props>) {
	const value = useMemo(() => ({ collections: initialValue }), [initialValue]);

	return <collectionsContext.Provider value={value}>{children}</collectionsContext.Provider>;
}

export function useCollections() {
	const context = useContext(collectionsContext);

	if (context === undefined) {
		throw new Error("useCollections must be used within a CollectionsProvider");
	}

	return context;
}
