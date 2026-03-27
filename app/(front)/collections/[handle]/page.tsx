import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { getCollection } from "@/lib/shopify";
import CollectionsContent from "@/components/CollectionsContent";
import CollectionsNavBar from "@/components/CollectionsNavBar";
import SectionError from "@/components/SectionError";
import SkeletonCollections from "@/components/SkeletonCollections";

type MetadataProps = {
	params: Promise<{ handle: string }>;
};
type Props = {
	params: Promise<{ handle: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Readonly<MetadataProps>): Promise<Metadata> {
	const { handle } = await params;
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${handle}`;
	const collection = await getCollection(handle);
	if (!collection) return {};

	return {
		title: collection.seo?.title ?? collection.title,
		description: collection.seo?.description ?? collection.description,
		openGraph: {
			title: collection.seo?.title ?? collection.title,
			description: collection.seo?.description ?? collection.description,
			url,
			type: "website",
			images: collection.image
				? [{ url: collection.image.url, alt: collection.image.altText ?? collection.title }]
				: [],
		},
		alternates: {
			canonical: url,
		},
	};
}

export default async function CollectionSinglePage({ params, searchParams }: Readonly<Props>) {
	const { handle } = await params;
	const currSearchParams = await searchParams;

	return (
		<>
			<CollectionsNavBar handle={handle} />
			<ErrorBoundary errorComponent={SectionError}>
				<Suspense fallback={<SkeletonCollections />}>
					<CollectionsContent searchParams={currSearchParams} handle={handle} />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
