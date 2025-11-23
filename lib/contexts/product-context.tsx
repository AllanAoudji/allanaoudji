"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useOptimistic } from "react";

type ProductState = { [key: string]: string };

type ProductContextType = {
	state: ProductState;
	updateOption: (_name: string, _value: string) => ProductState;
	updateImage: (_index: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type Props = {
	children: React.ReactNode;
};

export function ProductProvider({ children }: Readonly<Props>) {
	const searchParams = useSearchParams();

	const getInitialState = () => {
		const params: ProductState = {};
		for (const [key, value] of searchParams.entries()) {
			params[key] = value;
		}
		return params;
	};

	const [state, setOptimisticState] = useOptimistic(
		getInitialState(),
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
			return { ...state, ...updateImage };
		},
		[state, setOptimisticState],
	);

	const value = useMemo(
		() => ({
			state,
			updateOption,
			updateImage,
		}),
		[state, updateOption, updateImage],
	);

	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
	const context = useContext(ProductContext);
	if (context === undefined) {
		throw new Error("useProduct must be used within a ProductProvider");
	}
	return context;
}
