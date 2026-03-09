import Error from "../error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import CollectionsFiltersSideBarButton from "@/components/CollectionsFilterSideBarButton";
import Filters from "@/components/Filters";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>boutique</Title>
			<CollectionsFiltersSideBarButton className="mb-4 sm:hidden" />
			<Filters className="mb-4 hidden sm:block" />
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<div>...loading products</div>}>{children}</Suspense>
			</ErrorBoundary>
		</div>
	);
}
