"use client";

import { useCallback } from "react";
import { useModal } from "@/lib/contexts/modal-context";

export default function CollectionsFiltersSideBarButton() {
	const { openModal } = useModal();

	const handleClick = useCallback(() => {
		openModal("filters");
	}, [openModal]);

	return (
		<div className="mb-12 flex justify-center lg:hidden">
			<button
				className="hover:bg-quaternary hover:text-primary w-full cursor-pointer border px-4 py-2 tracking-wider uppercase transition"
				onClick={handleClick}
			>
				filtres
			</button>
		</div>
	);
}
