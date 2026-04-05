import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { DEFAULT_OG } from "@/lib/constants";
import CollectionsContent from "@/components/CollectionsContent";
import CollectionsNavBar from "@/components/CollectionsNavBar";
import SectionError from "@/components/SectionError";
import SkeletonCollections from "@/components/SkeletonCollections";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/collections`,
	},
	description: "Découvrez toutes les collections.",
	openGraph: {
		...DEFAULT_OG,
		description: "Découvrez toutes les collections.",
		images: [
			{
				alt: "Collections Allan Aoudji",
				height: 630,
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-collections.jpg`,
				width: 1200,
			},
		],
		title: "Collections | Allan Aoudji",
	},
	title: "Collections",
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
