import { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryImages from "@/components/GalleryImages";
import GalleryText from "@/components/GalleryText";
import Title from "@/components/Title";
import { getWork } from "@/studio/lib/queries";
import { workMainImage } from "@/types/sanityType";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const { data } = await getWork(slug);

	if (!data) return {};

	const title = data.seo?.title || data.title;
	const description = data.seo?.description || "";
	const imageUrl = data.mainImage?.url;

	const generateFeatureImage = (featuredImage: workMainImage | undefined) => {
		if (!featuredImage || !featuredImage.url || !featuredImage.width || !featuredImage.height)
			return [];
		return [
			{
				url: featuredImage.url,
				width: featuredImage.width,
				height: featuredImage.height,
				alt: featuredImage.alt ?? title,
			},
		];
	};

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			modifiedTime: data._updatedAt,
			images: generateFeatureImage(data.mainImage),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: imageUrl ? [imageUrl] : [],
		},
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${slug}`,
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
