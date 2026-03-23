import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import CollectionsFiltersSideBarButton from "@/components/CollectionsFilterSideBarButton";
import Filter from "@/components/Filter";
import SectionError from "@/components/SectionError";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>boutique</Title>
			<CollectionsFiltersSideBarButton className="mb-4 sm:hidden" />
			<Filter className="mb-4 hidden sm:block" type="collections" />
			<ErrorBoundary errorComponent={SectionError}>
				<Suspense fallback={<div>...loading products</div>}>{children}</Suspense>
			</ErrorBoundary>
		</div>
	);
}
