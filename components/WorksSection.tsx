import WorksSectionItem from "@/components/WorksSectionItem";
import WORKS from "@/utils/works";

export default function GallerySection() {
	return (
		<section className="section-separator section-container items-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{WORKS.map(work => (
				<WorksSectionItem key={work.id} work={work} />
			))}
		</section>
	);
}
