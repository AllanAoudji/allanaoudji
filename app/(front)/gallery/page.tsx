import GallerySection from "@/components/GallerySection";
import Title from "@/components/Title";
import { getGalleryWorks } from "@/.sanity/lib/queries";

export default async function Gallery() {
	const query = await getGalleryWorks();

	return (
		<div>
			<Title>galerie</Title>
			{query.works.map((work, i) => (
				<GallerySection key={work._id} work={work} separator={query.works.length - 1 !== i} />
			))}
		</div>
	);
}
