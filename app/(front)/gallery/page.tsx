import { Suspense } from "react";
import Title from "@/components/Title";
import WorksGallerySection from "@/components/WorksGallerySection";
import { getWorks } from "@/sanity/lib/queries";
import { WORKS_QUERYResult } from "@/sanity/types";

const GalleryLoader = async () => {
	let query: WORKS_QUERYResult;

	try {
		query = await getWorks("gallery");
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!query || !query.works || !query.works.length) {
		return (
			<div>
				<p>Empty</p>
			</div>
		);
	}

	return query.works.map((work, i) => (
		<WorksGallerySection
			key={work._id}
			separator={query.works ? query.works.length - 1 !== i : false}
			work={work}
		/>
	));
};

// TODO: create fallback
export default function Gallery() {
	return (
		<>
			<Title>galerie</Title>
			<Suspense fallback={<p>Loading...</p>}>
				<GalleryLoader />
			</Suspense>
		</>
	);
}
