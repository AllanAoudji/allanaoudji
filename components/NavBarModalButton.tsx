"use client";

import { useCallback } from "react";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	color?: "dark" | "light";
};

export default function NavBarModalButton({ className, color = "dark" }: Readonly<Props>) {
	const { openModal, closeModal, modal } = useModal();
	const handClick = useCallback(() => {
		if (modal === "menu") {
			closeModal();
			return;
		}
		openModal("menu");
	}, [closeModal, openModal, modal]);

	return (
		<>
			<div className={cn(className)}>
				<button
					className={cn(
						"text-secondary h-header cursor-pointer pr-4 text-sm font-bold uppercase",
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
						{
							"text-primary": color === "light",
						},
					)}
					onClick={handClick}
				>
					<span
						className={cn(
							"relative py-1 transition-opacity duration-300",
							"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
							"after:ease after:transition-transform after:duration-700 after:will-change-transform",
							"after:origin-right after:scale-x-0",
							{
								"after:bg-primary": color === "light",
							},
						)}
					>
						{modal === "menu" ? "fermer" : "menu"}
					</span>
				</button>
			</div>
		</>
	);
}
