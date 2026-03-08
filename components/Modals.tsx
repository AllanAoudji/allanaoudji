"use client";

import { useModal } from "@/lib/contexts/modal-context";
import CartModal from "./CartModal";
import FiltersModal from "./FiltersModal";

export default function Modals() {
	const { closeModal, modal } = useModal();

	return (
		<>
			<CartModal onCloseAction={closeModal} open={modal === "cart"} />
			<FiltersModal onCloseAction={closeModal} open={modal === "filters"} />
		</>
	);
}
