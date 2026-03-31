import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { DEFAULT_COLLECTION_IMAGE } from "@/lib/constants";
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

	const collection = await getCollection(handle);
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${handle}`;

	if (!collection) return {};

	const image = collection.image ?? DEFAULT_COLLECTION_IMAGE;

	return {
		alternates: {
			canonical: url,
		},
		description: collection.seo?.description ?? collection.description,
		openGraph: {
			description: collection.seo?.description ?? collection.description,
			images: [
				{
					alt: image.altText ?? collection.title,
					height: image.height,
					url: image.url,
					width: image.width,
				},
			],
			title: collection.seo?.title ?? collection.title,
			type: "website",
			url,
		},
		title: collection.seo?.title ?? collection.title,
	};
}

export default async function CollectionSinglePage({ params, searchParams }: Readonly<Props>) {
	const currSearchParams = await searchParams;
	const { handle } = await params;

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
