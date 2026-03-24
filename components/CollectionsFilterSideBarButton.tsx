"use client";

import { useCallback } from "react";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CollectionsFiltersSideBarButton({ className }: Readonly<Props>) {
	const { openModal } = useModal();

	const handleClick = useCallback(() => {
		openModal("collections-filters");
	}, [openModal]);

	return (
		<div className={cn("flex justify-center", className)}>
			<button
				className="hover:bg-quaternary hover:text-primary h-10 w-full cursor-pointer border py-2 tracking-wider uppercase transition-colors duration-300"
				onClick={handleClick}
			>
				filtres
			</button>
		</div>
	);
}
