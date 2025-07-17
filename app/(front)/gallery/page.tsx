import Title from "@/components/Title";
import WorksGallerySection from "@/components/WorksGallerySection";
import { getWorks } from "@/sanity/lib/queries";

export default async function Gallery() {
	const query = await getWorks("gallery");

	return (
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
}
