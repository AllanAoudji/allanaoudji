"use client";

import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

export default function CollectionsFilterModalHeader() {
	const { closeModal } = useModal();

	return (
		<div className="flex items-baseline justify-between px-4">
			<button
				className={cn(
					"text-secondary h-header cursor-pointer pr-4 text-sm font-bold uppercase",
					"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
				)}
				onClick={closeModal}
			>
				<span
					className={cn(
						"relative py-1 transition-opacity duration-300",
						"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
					)}
				>
					fermer
				</span>
			</button>
			<div className="h-header flex items-center justify-center">
				<h4 className="text-sm font-bold uppercase">collections</h4>
			</div>
		</div>
	);
}
