"use client";

import { useSearchParams } from "next/navigation";
import { DEFAULT_COLLECTION_IMAGE } from "@/lib/constants";
import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { useModal } from "@/lib/contexts/modal-context";
import ImageLink from "./ImageLink";

export default function CollectionsFilterCollections() {
	const { collections } = useLocalShopify();
	const searchParams = useSearchParams();
	const { closeModal } = useModal();

	if (collections.length <= 2) return null;

	return (
		<ul className={"grid grid-cols-2 gap-4"}>
			{collections.map(collection => {
				const newParams = new URLSearchParams(searchParams.toString());
				newParams.delete("q");

				const href = `${collection.path}?${newParams.toString()}`;
				return (
					<li key={collection.handle}>
						<ImageLink
							href={href}
							image={collection.image || DEFAULT_COLLECTION_IMAGE}
							onClick={closeModal}
							title={collection.title}
						/>
					</li>
				);
			})}
		</ul>
	);
}
