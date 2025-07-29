import { SORTING } from "@/lib/constants";
import FilterOrderingItem from "./FilterOrderingItem";

export default function FilterOrdering() {
	return (
		<ul>
			{SORTING.map(item => (
				<FilterOrderingItem key={item.slug} item={item} />
			))}
		</ul>
	);
}
