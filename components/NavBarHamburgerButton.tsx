"use client";

import { useCallback } from "react";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function NavBarHamburgerButton({ className }: Readonly<Props>) {
	const { openModal } = useModal();
	const handClick = useCallback(() => {
		openModal("menu");
	}, [openModal]);

	return (
		<>
			<div className={cn(className)}>
				<button
					className={cn(
						"h-20 cursor-pointer pr-4 text-sm font-black uppercase",
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
					)}
					onClick={handClick}
				>
					<span
						className={cn(
							"relative pb-1 transition-opacity duration-300",
							"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
							"after:ease after:transition-transform after:duration-700 after:will-change-transform",
							"after:origin-right after:scale-x-0",
						)}
					>
						menu
					</span>
				</button>
			</div>
		</>
	);
}
