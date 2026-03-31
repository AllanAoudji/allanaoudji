import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

export default function SkeletonWorks() {
	return (
		<div>
			<SkeletonText className="mt-2 mb-4" type="h2" size={30} />

			<SkeletonText className="mb-1.5" size={95} />
			<SkeletonText className="mb-1.5" size={75} />
			<SkeletonText className="mb-1.5" size={85} />
			<SkeletonText className="mb-1.5" />
			<SkeletonText className="mb-1.5" size={80} />
			<SkeletonText className="mb-4" size={55} />
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
			</div>
		</div>
	);
}
