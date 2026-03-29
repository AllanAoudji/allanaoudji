import { notFound } from "next/navigation";
import GalleryImages from "@/components/GalleryImages";
import GalleryText from "@/components/GalleryText";
import Title from "@/components/Title";
import { getWork } from "@/studio/lib/queries";

export default async function GallerySinglePage({
	params,
}: {
	params: Promise<{ workId: string }>;
}) {
	const { workId } = await params;

	const result = await getWork(workId);

	if (!result || !result.data) {
		notFound();
	}

	return (
		<>
			<Title>{result.data.title}</Title>
			<section>
				<GalleryText text={result.data.text} />
				<GalleryImages images={result.data.gallery} />
			</section>
		</>
	);
}
