import { Suspense } from "react";
import CollectionsFilters from "@/components/CollectionsFilters";
import CollectionsFiltersDropDown from "@/components/CollectionsFiltersDropDown";
import CollectionsFiltersDropDownBox from "@/components/CollectionsFiltersDropDownBox";
import Grid from "@/components/Grid";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container section-container">
			<Title>boutique</Title>
			<CollectionsFiltersDropDown>
				<CollectionsFiltersDropDownBox />
			</CollectionsFiltersDropDown>
			<div className="section-container">
				<Grid tag="section" type="smallest">
					<CollectionsFilters />
					<Suspense fallback={<div>...loading products</div>}>{children}</Suspense>
				</Grid>
			</div>
		</div>
	);
}
