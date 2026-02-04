import Filter from "./Filter";

export default function CollectionsFilters() {
	return (
		<div className="col-span-1 hidden lg:block">
			<Filter className="mb-16" type="collections" />
			<Filter type="ordering" />
		</div>
	);
}
