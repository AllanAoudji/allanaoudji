import GallerySection from "@/components/GallerySection";
import Title from "@/components/Title";
import WORKS from "@/utils/works";

export default function Work() {
	return (
		<div>
			<Title>galerie</Title>
			{WORKS.map((work, i) => (
				<GallerySection key={work.id} work={work} separator={WORKS.length - 1 !== i} />
			))}
		</div>
	);
}
