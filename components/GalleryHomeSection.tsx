import { FETCH_WORKS_HOME } from "@/lib/constants";
import GalleryHomeSectionContainer from "./GalleryHomeSectionContainer";
import GalleryHomeSectionItem from "./GalleryHomeSectionItem";
import { getWorks } from "@/sanity/lib/queries";

export default async function GalleryHomeSection() {
	const query = await getWorks(0, FETCH_WORKS_HOME);

	if (!query || !query.works || query.works.length == 0) {
		return null;
	}

	return (
		<GalleryHomeSectionContainer>
			{query.works.map(work => (
				<GalleryHomeSectionItem key={work._id} work={work} />
			))}
		</GalleryHomeSectionContainer>
	);
}
