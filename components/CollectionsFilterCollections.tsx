"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { cn } from "@/lib/utils";
import CollectionsFilterCollectionsItem from "./CollectionsFilterCollectionsItem";

type Props = {
	direction?: "column" | "row";
};

export default function CollectionsFilterCollections({ direction = "row" }: Readonly<Props>) {
	const { collections } = useLocalShopify();

	if (collections.length <= 1) return null;

	return (
		<ul
			className={cn("group flex flex-wrap items-baseline", {
				"flex-col": direction === "column",
				"-mx-2 w-fit": direction === "row",
			})}
		>
			{collections.map(collection => (
				<CollectionsFilterCollectionsItem
					direction={direction}
					item={collection}
					key={collection.handle}
				/>
			))}
		</ul>
	);
}
