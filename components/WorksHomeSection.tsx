import Link from "next/link";
import ImageContainer from "./ImageContainer";
import WorksHomeSectionContainer from "./WorksHomeSectionContainer";
import { getWorks } from "@/sanity/lib/queries";
import { WORKS_QUERYResult } from "@/sanity/types";

export default async function WorksSection() {
	let query: WORKS_QUERYResult;
	try {
		query = await getWorks("gallery");
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

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
