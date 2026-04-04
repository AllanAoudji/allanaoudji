"use client";

import { ERROR_CODE } from "../constants";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ModalType from "@/types/type";

type Props = {
	children: React.ReactNode;
};
type ModalContextType = {
	closeModal: () => void;
	modal: ModalType | null;
	openModal: (_modal: ModalType) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: Readonly<Props>) {
	const [modal, setModal] = useState<ModalType | null>(null);

	const closeModal = useCallback(() => {
		setModal(null);
	}, []);
	const openModal = useCallback((name: ModalType) => {
		setModal(name);
	}, []);

	const value = useMemo(() => ({ closeModal, modal, openModal }), [closeModal, modal, openModal]);

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
	const context = useContext(ModalContext);
	if (!context) throw new Error(ERROR_CODE.CONTEXT_NOT_FOUND);

	return context;
}
