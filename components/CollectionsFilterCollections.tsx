"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import CollectionsFilterCollectionsItem from "./CollectionsFilterCollectionsItem";

export default function CollectionsFilterCollections() {
	const { collections } = useLocalShopify();

	if (collections.length <= 2) return null;

	return (
		<ul className={"grid grid-cols-2 gap-4"}>
			{collections.map(collection => (
				<CollectionsFilterCollectionsItem item={collection} key={collection.handle} />
			))}
		</ul>
	);
}
