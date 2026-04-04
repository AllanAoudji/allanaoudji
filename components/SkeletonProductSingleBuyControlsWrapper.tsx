import SkeletonText from "./SkeletonText";

export default function SkeletonProductSingleBuyControlsWrapper() {
	return (
		<div>
			<SkeletonText className="mb-2" type="h1" />
			<SkeletonText className="mb-2" type="h1" />
			<SkeletonText className="mb-2" type="h1" />
		</div>
	);
}
