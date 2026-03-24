import WorksHomeSectionContainer from "./GalleryHomeSectionContainer";
import SkeletonWorkLink from "./SkeletonWorkLink";

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
