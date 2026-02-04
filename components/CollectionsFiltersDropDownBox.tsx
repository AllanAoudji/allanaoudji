import CollectionsFilters from "./CollectionsFilters";
import SubTitle from "./SubTitle";

export default function CollectionsFiltersDropDownBox() {
	return (
		<div className="bg-primary absolute inset-y-0 left-0 z-30 border-r-2 p-2">
			<SubTitle>Filtres:</SubTitle>
			<CollectionsFilters />
		</div>
	);
}
