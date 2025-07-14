import WorksSectionItem from "@/components/WorksSectionItem";
import { getHomeWorks } from "@/sanity/lib/queries";

export default async function GallerySection() {
	const query = await getHomeWorks();

	if (query.works.length == 0) {
		return null;
	}

	return (
		<section className="section-separator section-container items-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{query.works.map(work => (
				<WorksSectionItem key={work._id} work={work} />
			))}
		</section>
	);
}
