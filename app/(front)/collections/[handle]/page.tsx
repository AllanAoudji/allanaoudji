import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { cache } from "react";
import { getCollection } from "@/lib/shopify";
import { getCollectionsSafe } from "@/lib/shopify/utils/shopifyAdminFetch";
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

export const dynamicParams = true;

const getCollectionCached = cache(getCollection);

export async function generateStaticParams() {
	const collections = await getCollectionsSafe();
	return collections.filter(c => c.handle !== "").map(c => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Readonly<MetadataProps>): Promise<Metadata> {
	try {
		const { handle } = await params;
		const collection = await getCollectionCached(handle);
		const url = `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${handle}`;

		if (!collection) return {};

		return {
			alternates: { canonical: url },
			description: collection.seo?.description ?? collection.description,
			openGraph: {
				description: collection.seo?.description ?? collection.description,
				title: collection.seo?.title ?? collection.title,
				type: "website",
				url,
			},
			title: collection.seo?.title ?? collection.title,
		};
	} catch {
		return {};
	}
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
