import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

export default function SkeletonAbout() {
	return (
		<div className="grid gap-6 lg:grid-cols-5 lg:gap-16">
			<div className="lg:col-span-2">
				<SkeletonImage className="mb-1.5" ratio="4/3" />
			</div>
			<div className="lg:col-span-3">
				<SkeletonText className="mb-2" size={70} type="h1" />
				<SkeletonText className="mb-2" size={55} type="h2" />

				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" />
				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-3" size={60} />
			</div>
		</div>
	);
}
