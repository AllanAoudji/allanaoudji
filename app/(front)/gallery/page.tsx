import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import SectionError from "@/components/SectionError";
import SkeletonWorks from "@/components/SkeletonWorks";
import Title from "@/components/Title";
import WorksGallerySection from "@/components/WorksGallerySection";

export default function Gallery() {
	return (
		<>
			<Title>galerie</Title>
			<ErrorBoundary errorComponent={SectionError}>
				<Suspense fallback={<SkeletonWorks />}>
					<WorksGallerySection />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
