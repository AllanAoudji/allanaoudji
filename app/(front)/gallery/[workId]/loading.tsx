import Grid from "@/components/Grid";
import SkeletonImage from "@/components/SkeletonImage";
import SkeletonText from "@/components/SkeletonText";

export default function GallerySingleLoading() {
	return (
		<div>
			<SkeletonText className="mt-1.5 mb-6.5" size={35} type="h1" />

			<SkeletonText className="mb-1.5" size={95} />
			<SkeletonText className="mb-1.5" size={75} />
			<SkeletonText className="mb-1.5" size={85} />
			<SkeletonText className="mb-1.5" />
			<SkeletonText className="mb-1.5" size={80} />
			<SkeletonText className="mb-4" size={55} />

			<Grid>
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
				<SkeletonImage ratio="3/4" />
			</Grid>
		</div>
	);
}
