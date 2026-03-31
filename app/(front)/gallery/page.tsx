import { Metadata } from "next";
import { Suspense } from "react";
import GalleryContent from "@/components/GalleryContent";
import SkeletonWorks from "@/components/SkeletonWorks";
import Title from "@/components/Title";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
	},
	description:
		"Découvrez les mes créations graphiques et illustrations — affiches, prints et projets originaux.",
	openGraph: {
		description:
			"Découvrez les mes créations graphiques et illustrations — affiches, prints et projets originaux.",
		title: "Galerie | Allan Aoudji",
		type: "website",
	},
	title: "Galerie",
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
