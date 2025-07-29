"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Collection from "@/types/collection";

type Props = {
	item: Collection;
};

export default function FilterCollectionItem({ item }: Readonly<Props>) {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const active = pathName === item.path;
	const DynamicTag = active ? "p" : Link;
	const newParams = new URLSearchParams(searchParams.toString());

	newParams.delete("q");

	const href = `${item.path}?${newParams.toString()}`;

	return (
		<li className={`${active && "font-bold"}`}>
			<DynamicTag href={href}>{item.title}</DynamicTag>
		</li>
	);
}
