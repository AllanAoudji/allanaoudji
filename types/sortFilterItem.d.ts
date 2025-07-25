export type SortFilterItem = {
	title: string;
	slug: string | null;
	sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
	reverse: boolean;
};
