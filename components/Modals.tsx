"use client";

import { useModal } from "@/lib/contexts/modal-context";
import CartModal from "./CartModal";
import CollectionsFiltersModal from "./CollectionsFiltersModal";
import NavBarModal from "./NavBarModal";

export default function Modals() {
	const { closeModal, modal } = useModal();

	return (
		<>
			<CartModal onCloseAction={closeModal} open={modal === "cart"} />
			<CollectionsFiltersModal onCloseAction={closeModal} open={modal === "collections-filters"} />
			<NavBarModal onCloseAction={closeModal} open={modal === "menu"} />
		</>
	);
}
