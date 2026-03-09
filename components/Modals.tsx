"use client";

import { useModal } from "@/lib/contexts/modal-context";
import CartModal from "./CartModal";
import FiltersModal from "./FiltersModal";
import NavBarModal from "./NavBarModal";

export default function Modals() {
	const { closeModal, modal } = useModal();

	return (
		<>
			<CartModal onCloseAction={closeModal} open={modal === "cart"} />
			<FiltersModal onCloseAction={closeModal} open={modal === "filters"} />
			<NavBarModal onCloseAction={closeModal} open={modal === "menu"} />
		</>
	);
}
