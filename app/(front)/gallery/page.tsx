import { Metadata } from "next";
import { Suspense } from "react";
import GalleryContent from "@/components/GalleryContent";
import SkeletonWorks from "@/components/SkeletonWorks";
import Title from "@/components/Title";

export const metadata: Metadata = {
	title: "Galerie",
	description:
		"Découvrez les mes créations graphiques et illustrations — affiches, prints et projets originaux.",
	openGraph: {
		title: "Galerie | Allan Aoudji",
		description:
			"Découvrez les mes créations graphiques et illustrations — affiches, prints et projets originaux.",
		type: "website",
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
	},
};

export default function GalleryPage() {
	return (
		<>
			<Title>galerie</Title>
			<Suspense fallback={<SkeletonWorks />}>
				<GalleryContent />
			</Suspense>
		</>
	);
}
