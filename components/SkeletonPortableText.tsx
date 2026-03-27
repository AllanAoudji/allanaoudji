import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

export default function SkeletonPortableText() {
	return (
		<div className="grid min-h-screen grid-cols-1 gap-4 pt-1 md:grid-cols-2 lg:grid-cols-3">
			<div>
				<SkeletonText className="mb-2" type="h1" size={70} />
				<SkeletonText className="mb-2" type="h2" size={55} />

				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" />
				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-3" size={60} />

				<SkeletonText className="mb-1.5" size={90} />
				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-6" size={70} />

				<SkeletonText className="mb-2" type="h1" size={85} />
				<SkeletonText className="mb-2" type="h1" size={95} />

				<SkeletonText className="mb-1.5" size={80} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" size={75} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText size={55} />
			</div>
			<div className="hidden md:block">
				<SkeletonImage className="mb-1.5" ratio="4/3" />
				<SkeletonText className="mb-3" size={80} type="small" />

				<SkeletonText className="mb-2" type="h2" size={75} />
				<SkeletonText className="mb-4" type="h2" size={55} />

				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" size={75} />
				<SkeletonText className="mb-1.5" size={80} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText size={55} />
			</div>
			<div className="hidden lg:block">
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" />
				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-3" size={60} />

				<SkeletonImage className="mb-1.5" ratio="4/3" />
				<SkeletonText className="mb-3" size={80} type="small" />

				<SkeletonText className="mb-2" type="h1" size={80} />
				<SkeletonText className="mb-1.5" size={85} />
				<SkeletonText className="mb-1.5" size={95} />
				<SkeletonText className="mb-1.5" size={75} />
			</div>
		</div>
	);
}
