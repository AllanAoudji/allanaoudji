import SkeletonPortableText from "./SkeletonPortableText";
import SkeletonText from "./SkeletonText";

export default function SkeletonLegalPortableText() {
	return (
		<div>
			<SkeletonText className="mt-1 mb-4" size={30} type="current" />
			<SkeletonPortableText />
		</div>
	);
}
