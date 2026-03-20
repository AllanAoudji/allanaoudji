import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import WorksGallerySectionContainer from "./WorksGallerySectionContainer";
import { getWorks } from "@/sanity/lib/queries";
import { WORKS_QUERYResult } from "@/sanity/types";

export default async function WorksGallerySection() {
	let query: WORKS_QUERYResult;

	try {
		query = await getWorks(0, FETCH_WORKS_GALLERY);
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

	return (
		<div className="grid grid-cols-1">
			<WorksGallerySectionContainer initialWorks={query.works} initialTotal={query.total ?? 0} />
		</div>
	);
}
