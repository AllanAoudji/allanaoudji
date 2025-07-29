"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SortFilterItem from "@/types/sortFilterItem";

type Props = {
	item: SortFilterItem;
};

export default function FilterOrderingItem({ item }: Readonly<Props>) {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const active = searchParams.get("sort") === item.slug;
	const q = searchParams.get("q");

	const href = `${pathName}?${new URLSearchParams({
		...(q && { q }),
		...(item.slug && item.slug.length && { sort: item.slug }),
	})}`;

	const DynamicTag = active ? "p" : Link;

	return (
		<li className={`${active && "font-bold"}`}>
			<DynamicTag href={href}>{item.title}</DynamicTag>
		</li>
	);
}
