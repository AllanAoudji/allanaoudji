"use client";

import { useCollections } from "@/lib/contexts/collections-context";
import FilterCollectionItem from "./FilterCollectionItem";

export default function FilterCollection() {
	const { collections } = useCollections();

	if (collections.length <= 1) return null;

	return (
		<ul className="group flex flex-col">
			{collections.map(collection => (
				<FilterCollectionItem key={collection.handle} item={collection} />
			))}
		</ul>
	);
}
