import { SORTING } from "@/lib/constants";
import { getCollections } from "@/lib/shopify";
import CollectionItem from "./CollectionItem";
import SortItem from "./SortItem";

export default async function Collections() {
	const collections = await getCollections();

	if (collections.length <= 1) return null;

	return (
		<nav>
			<h3 className="hidden underline md:block">collections:</h3>
			<ul className="hidden md:block">
				{collections.map(collection => (
					<CollectionItem key={collection.handle} item={collection} />
				))}
			</ul>
			<ul className="md:hidden">{/* <CollectionItemDropdown /> */}</ul>
			<h3 className="hidden underline md:block">ordering:</h3>
			<ul>
				{SORTING.map(item => (
					<SortItem key={item.slug} item={item} />
				))}
			</ul>
		</nav>
	);
}
