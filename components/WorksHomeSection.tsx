import { FETCH_WORKS_HOME } from "@/lib/constants";
import WorksHomeSectionContainer from "./WorksHomeSectionContainer";
import WorksHomeSectionItem from "./WorksHomeSectionItem";
import { getWorks } from "@/sanity/lib/queries";

export default async function WorksSection() {
	const query = await getWorks(0, FETCH_WORKS_HOME);

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
