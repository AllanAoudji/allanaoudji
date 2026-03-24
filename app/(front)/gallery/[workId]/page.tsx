import { notFound } from "next/navigation";
import GalleryImages from "@/components/GalleryImages";
import GalleryText from "@/components/GalleryText";
import Title from "@/components/Title";
import { getWork } from "@/sanity/lib/queries";

export default async function GallerySinglePage({
	params,
}: {
	params: Promise<{ workId: string }>;
}) {
	const { workId } = await params;

	const work = await getWork(workId);

	if (!work) {
		notFound();
	}

	return (
		<>
			<Title>{work.title}</Title>
			<section>
				<GalleryText text={work.text} />
				<GalleryImages images={work.gallery} />
			</section>
		</>
	);
}
