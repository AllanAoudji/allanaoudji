"use client";

import { ERROR_CODE } from "../constants";
import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useOptimistic } from "react";

type ProductState = { [key: string]: string };

type ProductContextType = {
	state: ProductState;
	updateImage: (_index: string) => ProductState;
	updateOption: (_name: string, _value: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type Props = {
	children: React.ReactNode;
};

export function ProductProvider({ children }: Readonly<Props>) {
	const searchParams = useSearchParams();

	// FIX: useMemo pour éviter de recréer l'état initial à chaque render,
	// ce qui réinitialisait le state optimiste inutilement.
	const initialState = useMemo(() => {
		const params: ProductState = {};
		for (const [key, value] of searchParams.entries()) {
			params[key] = value;
		}
		return params;
	}, [searchParams]);

	const [state, setOptimisticState] = useOptimistic(
		initialState,
		(prevState: ProductState, update: ProductState) => ({
			...prevState,
			...update,
		}),
	);

	const updateOption = useCallback(
		(name: string, value: string) => {
			const newState = { [name]: value };
			setOptimisticState(newState);
			return { ...state, ...newState };
		},
		[state, setOptimisticState],
	);

	const updateImage = useCallback(
		(index: string) => {
			const newState = { image: index };
			setOptimisticState(newState);
			// FIX: était { ...state, ...updateImage } — référence circulaire avant déclaration.
			return { ...state, ...newState };
		},
		[state, setOptimisticState],
	);

	const value = useMemo(
		() => ({
			state,
			updateImage,
			updateOption,
		}),
		[state, updateImage, updateOption],
	);

	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
	const context = useContext(ProductContext);
	if (!context) throw new Error(`productContext: ${ERROR_CODE.CONTEXT_NOT_FOUND}`);

	return context;
}
