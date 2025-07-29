import { getCollections } from "@/lib/shopify";
import CollectionItem from "./CollectionItem";

export default async function FilterCollection() {
	const collections = await getCollections();

	if (collections.length <= 1) return null;

	return (
		<nav className="col-span-1">
			<h3 className="hidden underline md:block">collections:</h3>
			<ul className="hidden md:block">
				{collections.map(collection => (
					<CollectionItem key={collection.handle} item={collection} />
				))}
			</ul>
			<ul className="md:hidden">{/* <CollectionItemDropdown /> */}</ul>
		</nav>
	);
}
