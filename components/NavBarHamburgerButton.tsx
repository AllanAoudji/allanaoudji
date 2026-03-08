"use client";

import { useCallback, useEffect, useState } from "react";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import NavBarHamburgerMenu from "./NavBarHamburgerMenu";

type Props = {
	className?: string;
};

export default function NavBarHamburgerButton({ className }: Readonly<Props>) {
	const { width } = useWindowDimensions();
	const [open, setOpen] = useState<boolean>(false);

	const setIsClose = useCallback(() => {
		setOpen(false);
	}, []);
	const setIsOpen = useCallback(() => {
		setOpen(true);
	}, []);

	useEffect(() => {
		if (open) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [open]);

	useEffect(() => {
		if (!width || (width >= 640 && open)) {
			setIsClose();
		}
	}, [open, setIsClose, width]);

	return (
		<>
			<div className={cn(className)}>
				<button
					className={cn(
						"h-20 cursor-pointer pr-4 text-sm font-black uppercase",
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
					)}
					onClick={setIsOpen}
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
			<NavBarHamburgerMenu open={open} setIsClose={setIsClose} />
		</>
	);
}
