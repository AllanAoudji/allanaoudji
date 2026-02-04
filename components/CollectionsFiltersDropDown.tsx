"use client";

import { useCallback, useEffect, useState } from "react";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";

type Props = {
	children: React.ReactNode;
};

export default function CollectionsFiltersDropDown({ children }: Readonly<Props>) {
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
		if (!width || (width >= 1024 && open)) {
			setIsClose();
		}
	}, [open, setIsClose, width]);

	return (
		<>
			<button
				onClick={setIsOpen}
				className="mb-12 block cursor-pointer border-2 px-4 py-2 text-lg uppercase lg:hidden"
			>
				filtres
			</button>
			{open && (
				<div className="fixed inset-0 z-30 overflow-auto lg:hidden">
					{children}
					<div
						className="absolute inset-0 z-20 backdrop-blur-md"
						onClick={e => {
							e.stopPropagation();
							setIsClose();
						}}
					></div>
				</div>
			)}
		</>
	);
}
