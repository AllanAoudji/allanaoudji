"use client";

import { useCallback } from "react";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	open: boolean;
	setIsClose: () => void;
};

export default function CollectionsFilterSideBar({ children, open, setIsClose }: Readonly<Props>) {
	const onClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			setIsClose();
		},
		[setIsClose],
	);

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-30 overflow-auto lg:hidden">
			<div className="bg-primary absolute inset-y-0 left-0 z-30 overflow-auto p-8">
				<SubTitle className="py-4">Filtres:</SubTitle>
				{children}
			</div>
			<div className="absolute inset-0 z-20 backdrop-blur-md" onClick={onClick}></div>
		</div>
	);
}
