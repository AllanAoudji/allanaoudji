"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import FiltersModal from "@/components/FiltersModal";
import ModalType from "@/types/type";

type Props = {
	children: React.ReactNode;
};
type ModalContextType = {
	closeModal: () => void;
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

	const value = useMemo(() => ({ closeModal, openModal }), [closeModal, openModal]);

	return (
		<ModalContext.Provider value={value}>
			{children}

			{/* Toutes les modals sont centralisées ici */}
			<FiltersModal onCloseAction={closeModal} open={modal === "filters"} />
		</ModalContext.Provider>
	);
}

export function useModal() {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("useModal must be used inside ModalProvider");
	}
	return context;
}
