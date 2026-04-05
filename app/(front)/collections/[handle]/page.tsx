import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { getCachedCollection } from "@/lib/shopify/utils/cached";
import { getCollections } from "@/lib/shopify/utils/shopifyAdminFetch";
import CollectionsContent from "@/components/CollectionsContent";
import CollectionsNavBar from "@/components/CollectionsNavBar";
import SectionError from "@/components/SectionError";
import SkeletonCollections from "@/components/SkeletonCollections";
import Collection from "@/types/collection";

type MetadataProps = {
	params: Promise<{ handle: string }>;
};

type Props = {
	params: Promise<{ handle: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
	let collections: Collection[];
	try {
		collections = await getCollections();
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "generateStaticParams products" },
		});
		throw error;
	}
	return collections.filter(c => c.handle !== "").map(c => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Readonly<MetadataProps>): Promise<Metadata> {
	const { handle } = await params;
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${handle}`;

	let collection;
	try {
		collection = await getCachedCollection(handle);
	} catch {
		return {};
	}

	if (!collection) return {};

	return {
		alternates: { canonical: url },
		description: collection.seo?.description ?? collection.description,
		openGraph: {
			description: collection.seo?.description ?? collection.description,
			locale: "fr_FR",
			siteName: "Allan Aoudji",
			title: collection.seo?.title ?? collection.title,
			type: "website",
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
