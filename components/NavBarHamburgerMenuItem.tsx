"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import Menu from "@/types/menu";

type Props = {
	setIsClose: () => void;
	menu: Menu;
};

export default function NavBarHamburgerMenuItem({ setIsClose, menu }: Readonly<Props>) {
	const isActiveSegment = useSelectedLayoutSegment();

	const isActive = useMemo(() => {
		if (isActiveSegment && menu.activeSegment?.includes(isActiveSegment)) {
			return true;
		}
		if (!isActiveSegment && menu.activeSegment === null) {
			return true;
		}
		return false;
	}, [isActiveSegment, menu]);

	const onClick = useCallback(() => {
		if (isActive) {
			return;
		}
		setIsClose();
	}, [isActive, setIsClose]);

	return (
		<Link
			onClick={onClick}
			key={menu.href}
			href={menu.href}
			className={cn(
				{
					"cursor-default underline": isActive,
					"nav-hover animation": !isActive,
				},
				"text-center text-5xl uppercase decoration-2 underline-offset-4",
			)}
		>
			{menu.title}
		</Link>
	);
}
