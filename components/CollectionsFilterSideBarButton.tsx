"use client";

import { useFiltersSideBar } from "@/lib/contexts/filters-sidebar-context";

export default function CollectionsFiltersSideBarButton() {
	const { setIsOpen } = useFiltersSideBar();

	return (
		<div className="mb-12 flex justify-center lg:hidden">
			<button
				className="hover:bg-quaternary hover:text-primary w-full cursor-pointer border px-4 py-2 tracking-wider uppercase transition"
				onClick={setIsOpen}
			>
				filtres
			</button>
		</div>
	);
}
