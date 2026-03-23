import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import WorksGallerySectionContainer from "./WorksGallerySectionContainer";
import { getWorks } from "@/sanity/lib/queries";

export default async function WorksGallerySection() {
	const query = await getWorks(0, FETCH_WORKS_GALLERY);

	if (!query || !query.works || !query.works.length) {
		return (
			<div>
				<p>Empty</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1">
			<WorksGallerySectionContainer initialWorks={query.works} initialTotal={query.total ?? 0} />
		</div>
	);
}
