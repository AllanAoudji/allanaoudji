import Error from "../error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import Title from "@/components/Title";
import WorksGallerySection from "@/components/WorksGallerySection";
import WorksGallerySectionLoader from "@/components/WorksGallerySectionLoader";

export default function Gallery() {
	return (
		<div className="padding-container vertical-padding">
			<Title>galerie</Title>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<WorksGallerySectionLoader />}>
					<WorksGallerySection />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
