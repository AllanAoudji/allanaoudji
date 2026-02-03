"use client";

import { useCallback, useEffect, useState } from "react";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import NavBarHamburgerMenu from "./NavBarHamburgerMenu";

export default function NavBarHamburger() {
	const [open, setOpen] = useState<boolean>(false);
	const { width } = useWindowDimensions();

	const setIsOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const setIsClose = useCallback(() => {
		setOpen(false);
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
			<button onClick={setIsOpen} className="inlin cursor-pointer sm:hidden">
				hamburger
			</button>
			<NavBarHamburgerMenu open={open} setIsClose={setIsClose} />
		</>
	);
}
