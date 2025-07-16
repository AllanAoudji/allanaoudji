import GallerySection from "@/components/GallerySection";
import Title from "@/components/Title";
import { getGalleryWorks } from "@/sanity/lib/queries";

export default async function Gallery() {
	const query = await getGalleryWorks();

	return (
		<div>
			<Title>galerie</Title>
			{query.works ? (
				query.works.map((work, i) => (
					<GallerySection
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
		</div>
	);
}
