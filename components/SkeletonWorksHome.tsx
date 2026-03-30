import WorksHomeSectionContainer from "./GalleryHomeSectionContainer";
import SkeletonWorkLink from "./SkeletonWorkLink";

type Props = {
	className?: string;
};

export default function SkeletonWorksHome({ className }: Readonly<Props>) {
	return (
		<WorksHomeSectionContainer className={className}>
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
			<SkeletonWorkLink />
		</WorksHomeSectionContainer>
	);
}
