import { FETCH_WORKS_HOME } from "@/lib/constants";
import WorksHomeSectionContainer from "./WorksHomeSectionContainer";
import WorksHomeSectionItem from "./WorksHomeSectionItem";
import { getWorks } from "@/sanity/lib/queries";
import { WORKS_QUERY_RESULT } from "@/sanity/types";

export default async function WorksSection() {
	let query: WORKS_QUERY_RESULT;
	try {
		query = await getWorks(0, FETCH_WORKS_HOME);
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
				<WorksHomeSectionItem key={work._id} work={work} />
			))}
		</WorksHomeSectionContainer>
	);
}
