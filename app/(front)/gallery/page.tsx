import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import SectionError from "@/components/SectionError";
import Title from "@/components/Title";
import WorksGallerySection from "@/components/WorksGallerySection";
import WorksGallerySectionLoader from "@/components/WorksGallerySectionLoader";

export default function Gallery() {
	return (
		<>
			<Title>galerie</Title>
			<ErrorBoundary errorComponent={SectionError}>
				<Suspense fallback={<WorksGallerySectionLoader />}>
					<WorksGallerySection />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
