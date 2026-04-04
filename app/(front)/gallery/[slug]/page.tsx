import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import GalleryImages from "@/components/GalleryImages";
import GalleryText from "@/components/GalleryText";
import Title from "@/components/Title";
import { getStaticWorksSiteMap, getWork } from "@/studio/lib/queries";

export const dynamicParams = true;

const getWorkCached = cache(getWork);

export async function generateStaticParams() {
	const works = await getStaticWorksSiteMap();
	if (!works) return [];
	return works.map((work: { slug: string }) => ({ slug: work.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const { data } = await getWorkCached(slug);

	if (!data) return {};

	const description = data.seo?.description || "";
	const title = data.seo?.title || data.title;

	return {
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${slug}`,
		},
		description,
		openGraph: {
			description,
			modifiedTime: data._updatedAt,
			title,
			type: "article",
		},
		title,
		twitter: {
			card: "summary_large_image",
			description,
			title,
		},
	};
}

export default async function GallerySinglePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const result = await getWorkCached(slug);

	if (!result || !result.data) {
		notFound();
	}

	return (
		<>
			<Title>{result.data.title}</Title>
			<section>
				<GalleryText text={result.data.text} />
				<GalleryImages images={result.data.gallery} />
			</section>
		</>
	);
}
