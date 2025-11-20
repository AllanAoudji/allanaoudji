import { Suspense } from "react";
import Title from "@/components/Title";
import WorksGallerySection from "@/components/WorksGallerySection";
import { getWorks } from "@/sanity/lib/queries";

const GalleryLoader = async () => {
	const query = await getWorks("gallery");
	return (
		// TODO: create fallback
		<>
			<Title>galerie</Title>
			{!!query && query.works && !!query.works.length ? (
				query.works.map((work, i) => (
					<WorksGallerySection
						key={work._id}
						separator={query.works ? query.works.length - 1 !== i : false}
						work={work}
					/>
				))
			) : (
				<div>
					<p>Empty</p>
				</div>
			)}
		</>
	);
};

export default function Gallery() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<GalleryLoader />
		</Suspense>
	);
}
