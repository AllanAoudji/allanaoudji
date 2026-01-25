import WorksGallerySectionItemContainer from "./WorksGallerySectionItemContainer";
import { getWorks } from "@/sanity/lib/queries";
import { WORKS_QUERYResult } from "@/sanity/types";

export default async function WorksGallerySection() {
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

	return <WorksGallerySectionItemContainer works={query.works} />;
}
