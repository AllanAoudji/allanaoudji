import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import EmptyGallery from "./EmptyGallery";
import GalleryContentInfiniteScroll from "./GalleryContentInfiniteScroll";
import { getWorks } from "@/studio/lib/queries";

export default async function GalleryContent() {
	const result = await getWorks(0, FETCH_WORKS_GALLERY);

	if (!result || !result.data || !result.data.works || !result.data.works.length) {
		return <EmptyGallery />;
	}

	return (
		<GalleryContentInfiniteScroll
			initialWorks={result.data.works}
			initialTotal={result.data.total ?? 0}
		/>
	);
}
