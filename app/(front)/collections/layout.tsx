import Error from "../error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { FiltersSideBarProvider } from "@/lib/contexts/filters-sidebar-context";
import CollectionsFiltersSideBarButton from "@/components/CollectionsFilterSideBarButton";
import CollectionsFilters from "@/components/CollectionsFilters";
import Grid from "@/components/Grid";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<FiltersSideBarProvider SideBarContent={<CollectionsFilters />}>
			<div className="padding-container section-container">
				<Title>boutique</Title>
				<div className="section-container">
					<CollectionsFiltersSideBarButton />
					<Grid tag="section" type="smallest">
						<CollectionsFilters className="hidden lg:block" />
						<ErrorBoundary errorComponent={Error}>
							<Suspense fallback={<div>...loading products</div>}>{children}</Suspense>
						</ErrorBoundary>
					</Grid>
				</div>
			</div>
		</FiltersSideBarProvider>
	);
}
