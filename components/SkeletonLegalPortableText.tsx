import SkeletonPortableText from "./SkeletonPortableText";
import SkeletonText from "./SkeletonText";

export default function SkeletonLegalPortableText() {
	return (
		<div>
			<SkeletonText className="mt-0.5 mb-4.5" size={30} type="current" />
			<SkeletonPortableText />
		</div>
	);
}
