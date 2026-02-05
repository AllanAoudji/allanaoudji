"use client";

import useWindowDimensions from "../hooks/useWindowDimensions";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CollectionsFilterSideBar from "@/components/CollectionsFilterSideBar";

type Props = {
	children: React.ReactNode;
	SideBarContent: React.ReactNode;
};

type FiltersSideBarType = {
	setIsOpen: () => void;
	setIsClose: () => void;
};

const FiltersSideBarContext = createContext<FiltersSideBarType | undefined>(undefined);

export function FiltersSideBarProvider({ children, SideBarContent }: Readonly<Props>) {
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

	const value = useMemo(() => ({ setIsOpen, setIsClose }), [setIsOpen, setIsClose]);

	return (
		<FiltersSideBarContext.Provider value={value}>
			<CollectionsFilterSideBar open={open} setIsClose={setIsClose}>
				{SideBarContent}
			</CollectionsFilterSideBar>
			{children}
		</FiltersSideBarContext.Provider>
	);
}

export function useFiltersSideBar() {
	const context = useContext(FiltersSideBarContext);
	if (context === undefined) {
		throw new Error("useFiltersSideBar must be used within a FiltersSideBarProvider");
	}
	return context;
}
