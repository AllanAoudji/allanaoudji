import { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryImages from "@/components/GalleryImages";
import GalleryText from "@/components/GalleryText";
import Title from "@/components/Title";
import { getWork } from "@/studio/lib/queries";
import { WorkMainImage } from "@/types/sanityType";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const { data } = await getWork(slug);

	if (!data) return {};

	const description = data.seo?.description || "";
	const imageUrl = data.mainImage?.url;
	const title = data.seo?.title || data.title;

	const generateFeatureImage = (featuredImage: WorkMainImage | undefined) => {
		if (!featuredImage || !featuredImage.height || !featuredImage.url || !featuredImage.width)
			return [];
		return [
			{
				alt: featuredImage.alt ?? title,
				height: featuredImage.height,
				url: featuredImage.url,
				width: featuredImage.width,
			},
		];
	};

	return {
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${slug}`,
		},
		description,
		openGraph: {
			description,
			images: generateFeatureImage(data.mainImage),
			modifiedTime: data._updatedAt,
			title,
			type: "article",
		},
		title,
		twitter: {
			card: "summary_large_image",
			description,
			images: imageUrl ? [imageUrl] : [],
			title,
		},
	};
}

export default async function GallerySinglePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const result = await getWork(slug);

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
