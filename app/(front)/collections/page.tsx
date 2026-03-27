import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import CollectionsContent from "@/components/CollectionsContent";
import CollectionsNavBar from "@/components/CollectionsNavBar";
import SectionError from "@/components/SectionError";
import SkeletonCollections from "@/components/SkeletonCollections";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
	title: "Collections",
	description: "Découvrez toutes les collections.",
	openGraph: {
		title: "Collections",
		description: "Découvrez toutes les collections.",
		url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections`,
		type: "website",
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/collections`,
	},
};

export default async function CollectionsPage({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return (
		<>
			<CollectionsNavBar />
			<ErrorBoundary errorComponent={SectionError}>
				<Suspense fallback={<SkeletonCollections />}>
					<CollectionsContent searchParams={currSearchParams} />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
