import { getCollections } from "@/lib/shopify";
import FilterCollectionItem from "./FilterCollectionItem";

export default async function FilterCollection() {
	const collections = await getCollections();

	if (collections.length <= 1) return null;

	return (
		<ul>
			{collections.map(collection => (
				<FilterCollectionItem key={collection.handle} item={collection} />
			))}
		</ul>
	);
}
