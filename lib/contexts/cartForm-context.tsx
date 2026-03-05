"use client";

import itemReducer from "../actions/itemReducer";
import {
	createContext,
	useActionState,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import CartItem from "@/types/cartItem";
import MessageCallback from "@/types/messageCallback";

type MessageData = {
	cartItem?: CartItem;
	quantityAdded?: number;
	type: Type;
};
type ProductPending = {
	id: string;
	type: Type;
	isPending: boolean;
};
type Props = {
	children: React.ReactNode;
};
type Type = "ADD" | "DELETE" | "UPDATE";

type CartFormContextType = {
	addAction: (_id: string, _quantity: number) => () => void;
	cartModalItem: CartItem | null;
	handleCloseCartModal: () => void;
	isOpenCartModal: boolean;
	setAddProductPending: (_id: string) => void;
	setUpdateProductPending: (_id: string) => void;
	message: MessageCallback<MessageData> | null;
	productPending: ProductPending | null;
	removeAction: (_id: string) => () => void;
	updateAction: (_id: string, _quantity: number) => () => void;
};

const CartFormContext = createContext<CartFormContextType | undefined>(undefined);

export function CartFormProvider({ children }: Readonly<Props>) {
	const [productPending, setProductPending] = useState<ProductPending | null>(null);
	const [cartModalItem, setCartModalItem] = useState<CartItem | null>(null);
	const [isOpenCartModal, setIsOpenCartModal] = useState<boolean>(false);

	const [message, formAction, isPending] = useActionState(itemReducer, null);

	// Cart actions
	const addAction = useCallback(
		(id: string, quantity: number) => {
			return formAction.bind(null, { id, quantity, type: "ADD" });
		},
		[formAction],
	);
	const removeAction = useCallback(
		(id: string) => {
			return formAction.bind(null, { id, type: "DELETE" });
		},
		[formAction],
	);
	const updateAction = useCallback(
		(id: string, quantity: number) => {
			return formAction.bind(null, { id, quantity, type: "UPDATE" });
		},
		[formAction],
	);

	const setAddProductPending = useCallback((id: string) => {
		setProductPending({
			id,
			type: "ADD",
			isPending: false,
		});
	}, []);

	const setUpdateProductPending = useCallback((id: string) => {
		setProductPending({
			id,
			type: "UPDATE",
			isPending: false,
		});
	}, []);

	// Modal
	const handleCloseCartModal = useCallback(() => {
		setIsOpenCartModal(false);
		setCartModalItem(null);
	}, []);

	useEffect(() => {
		// TODO:
		// Seulement quand l'action = ADD
		if (
			message &&
			(message.type === "success" || message.type === "warning") &&
			!!message.data &&
			!!message.data.cartItem &&
			!!message.data.quantityAdded
		) {
			setCartModalItem(message.data.cartItem);
			setIsOpenCartModal(true);
		}
	}, [message]);

	useEffect(() => {
		if (!isPending) {
			setProductPending(null);
		}
		if (isPending) {
			setProductPending(prevState => {
				if (prevState) {
					return {
						...prevState,
						isPending: true,
					};
				}
				return null;
			});
		}
	}, [isPending]);

	const value = useMemo(
		() => ({
			addAction,
			cartModalItem,
			handleCloseCartModal,
			isOpenCartModal,
			setAddProductPending,
			setUpdateProductPending,
			message,
			isPending,
			productPending,
			removeAction,
			updateAction,
		}),
		[
			addAction,
			cartModalItem,
			handleCloseCartModal,
			isOpenCartModal,
			message,
			setAddProductPending,
			setUpdateProductPending,
			isPending,
			productPending,
			removeAction,
			updateAction,
		],
	);

	return <CartFormContext.Provider value={value}>{children}</CartFormContext.Provider>;
}

export function useCartForm() {
	const context = useContext(CartFormContext);
	if (context === undefined) {
		throw new Error("useCartForm must be used within a CartModalProvider");
	}
	return context;
}
