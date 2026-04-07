import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { TAGS, workTag } from "@/lib/constants";
import GalleryImages from "@/components/GalleryImages";
import GalleryText from "@/components/GalleryText";
import Title from "@/components/Title";
import { getStaticWorksSiteMap, getWork } from "@/studio/lib/queries";
import { WORKS_SITEMAP_QUERY_RESULT } from "@/studio/types";

export const dynamicParams = true;
export const revalidate = 86400;

const getCachedWork = (slug: string) =>
	unstable_cache(async () => getWork(slug), [`work-${slug}`], {
		tags: [TAGS.sanityWorks, workTag(slug)],
		revalidate: 86400,
	})();

export async function generateStaticParams() {
	let works: WORKS_SITEMAP_QUERY_RESULT;
	try {
		works = await getStaticWorksSiteMap();
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "generateStaticParams gallery" },
		});
		throw error;
	}
	if (!works) return [];
	return works.map((work: { slug: string }) => ({ slug: work.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	let data;
	try {
		({ data } = await getCachedWork(slug));
	} catch {
		return {};
	}

	if (!data) return {};

	const description = data.seo?.description || "";
	const title = data.seo?.title || data.title;

	return {
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${slug}`,
		},
		description,
		openGraph: {
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${slug}`,
			description,
			locale: "fr_FR",
			siteName: "Allan Aoudji",
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

	let result;
	try {
		result = await getCachedWork(slug);
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "GallerySinglePage", slug },
		});
		notFound();
	}

	if (!result?.data) notFound();

	return (
		<>
			<Title>{result.data.title}</Title>
			<section>
				<GalleryText text={result.data.text} />
				<GalleryImages images={result.data.gallery} standalone={true} />
			</section>
		</>
	);
}
