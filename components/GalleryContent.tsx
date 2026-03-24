import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import EmptyGallery from "./EmptyGallery";
import GalleryContentInfiniteScroll from "./GalleryContentInfiniteScroll";
import { getWorks } from "@/sanity/lib/queries";

export default async function GalleryContent() {
	const query = await getWorks(0, FETCH_WORKS_GALLERY);

	if (!query || !query.works || !query.works.length) {
		return <EmptyGallery />;
	}

	return <GalleryContentInfiniteScroll initialWorks={query.works} initialTotal={query.total ?? 0} />;
}
