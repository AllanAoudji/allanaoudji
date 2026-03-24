import { Suspense } from "react";
import GalleryContent from "@/components/GalleryContent";
import SkeletonWorks from "@/components/SkeletonWorks";
import Title from "@/components/Title";

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
