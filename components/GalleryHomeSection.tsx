import * as Sentry from "@sentry/nextjs";
import { FETCH_WORKS_HOME } from "@/lib/constants";
import GalleryHomeSectionContainer from "./GalleryHomeSectionContainer";
import ImageLink from "./ImageLink";
import { getWorks } from "@/studio/lib/queries";

type Props = {
	className?: string;
};

export default async function GalleryHomeSection({ className }: Readonly<Props>) {
	let query;
	try {
		query = await getWorks(0, FETCH_WORKS_HOME);
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to fetch works for home section" },
		});
		throw error;
	}

	if (!query || !query.data || !query.data.works || query.data.works.length === 0) {
		return null;
	}

	return (
		<GalleryHomeSectionContainer className={className}>
			{query.data.works.map(work => (
				<ImageLink
					href={`/gallery/${work.slug}`}
					image={work.mainImage}
					title={work.title}
					key={work._id}
				/>
			))}
		</GalleryHomeSectionContainer>
	);
}
