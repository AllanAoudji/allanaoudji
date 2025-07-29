import { SORTING } from "@/lib/constants";
import SortItem from "./SortItem";

export default function FilterOrdering() {
	return (
		<div className="col-span-1">
			<h3 className="hidden underline md:block">ordering:</h3>
			<ul>
				{SORTING.map(item => (
					<SortItem key={item.slug} item={item} />
				))}
			</ul>
		</div>
	);
}
