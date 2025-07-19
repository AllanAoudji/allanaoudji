import Link from "next/link";
import ImageContainer from "./ImageContainer";
import WorksHomeSectionContainer from "./WorksHomeSectionContainer";
import { getWorks } from "@/sanity/lib/queries";

export default async function WorksSection() {
	const query = await getWorks("gallery");

	if (!query || !query.works || query.works.length == 0) {
		return null;
	}

	return (
		<WorksHomeSectionContainer>
			{query.works.map(work => (
				<Link key={work._id} href={`/gallery/${work.slug}`}>
					<h3>{work.title}</h3>
					{!!work.mainImage && <ImageContainer image={work.mainImage} ratio="4/3" />}
				</Link>
			))}
		</WorksHomeSectionContainer>
	);
}
