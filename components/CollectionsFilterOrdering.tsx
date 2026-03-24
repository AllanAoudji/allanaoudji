import { SORTING } from "@/lib/constants";
import CollectionsFilterOrderingItem from "./CollectionsFilterOrderingItem";

export default function CollectionsFilterOrdering() {
	return (
		<ul className="group flex flex-col">
			{SORTING.map(item => (
				<CollectionsFilterOrderingItem key={item.slug} item={item} />
			))}
		</ul>
	);
}
