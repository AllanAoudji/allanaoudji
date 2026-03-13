"use client";

import { useCollections } from "@/lib/contexts/collections-context";
import { cn } from "@/lib/utils";
import FilterCollectionItem from "./FilterCollectionItem";

type Props = {
	direction?: "column" | "row";
};

export default function FilterCollection({ direction = "row" }: Readonly<Props>) {
	const { collections } = useCollections();

	if (collections.length <= 1) return null;

	return (
		<ul
			className={cn("group flex flex-wrap items-baseline", {
				"flex-col": direction === "column",
				"-mx-2": direction === "row",
			})}
		>
			{collections.map(collection => (
				<FilterCollectionItem direction={direction} key={collection.handle} item={collection} />
			))}
		</ul>
	);
}
