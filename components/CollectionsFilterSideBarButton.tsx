"use client";

import { useFiltersSideBar } from "@/lib/contexts/filters-sidebar-context";

export default function CollectionsFiltersSideBarButton() {
	const { setIsOpen } = useFiltersSideBar();

	return (
		<div className="mb-8 flex justify-center">
			<button
				className="cursor-pointer rounded-full border-2 px-8 py-1 tracking-wide uppercase lg:hidden"
				onClick={setIsOpen}
			>
				filtres
			</button>
		</div>
	);
}
