"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { cn } from "@/lib/utils";
import CollectionsFilterModalButton from "./CollectionsFilterModalButton";

type Props = {
	handle?: string;
};

export default function CollectionsNavBar({ handle }: Readonly<Props>) {
	const { collections } = useLocalShopify();

	const collection = collections.find(c => c.handle === handle);
	const collectionIsMissing = !!handle && !collection;

	if (collections.length <= 1) return null;

	return (
		<div
			className={cn("mb-2 flex items-baseline justify-between", {
				"justify-end": collectionIsMissing,
			})}
		>
			{!collectionIsMissing && (
				<div className="overflow-hidden">
					<h3 className="truncate text-xs uppercase">{collection?.title || "tous les articles"}</h3>
				</div>
			)}
			<CollectionsFilterModalButton className="-mt-1" />
		</div>
	);
}
