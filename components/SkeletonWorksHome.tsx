import SkeletonWorkLink from "./SkeletonWorkLink";
import WorksHomeSectionContainer from "./WorksHomeSectionContainer";

export default function SkeletonWorksHome() {
	return (
		<WorksHomeSectionContainer>
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
		</WorksHomeSectionContainer>
	);
}
