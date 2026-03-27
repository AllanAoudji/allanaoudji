"use client";

import { useCallback } from "react";
import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CollectionsFilterModalButton({ className }: Readonly<Props>) {
	const { openModal } = useModal();
	const { collections } = useLocalShopify();

	const handleClick = useCallback(() => {
		openModal("collections-filters");
	}, [openModal]);

	if (collections.length <= 1) return null;

	return (
		<div className={cn("flex justify-end", className)}>
			<button
				onClick={handleClick}
				className={cn(
					"text-secondary cursor-pointer py-2 pl-4 text-sm font-bold tracking-wide uppercase",
					"hover:[&_span]:after:origin-right hover:[&_span]:after:scale-x-0",
				)}
			>
				<span
					className={cn(
						"relative py-0.5 transition-opacity duration-300",
						"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-left after:scale-x-100",
					)}
				>
					collections
				</span>
			</button>
		</div>
	);
}
