"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useFiltersSideBar } from "@/lib/contexts/filters-sidebar-context";
import { cn } from "@/lib/utils";
import Collection from "@/types/collection";

type Props = {
	item: Collection;
};

export default function FilterCollectionItem({ item }: Readonly<Props>) {
	const { setIsClose } = useFiltersSideBar();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const active = pathName === item.path;
	const DynamicTag = active ? "p" : Link;
	const newParams = new URLSearchParams(searchParams.toString());
	const onClick = useCallback(() => {
		if (active) return;
		setIsClose();
	}, [setIsClose, active]);

	newParams.delete("q");

	const href = `${item.path}?${newParams.toString()}`;

	return (
		<li className={cn({ "font-bold underline": active }, "text-sm")}>
			<DynamicTag onClick={onClick} href={href}>
				{item.title}
			</DynamicTag>
		</li>
	);
}
