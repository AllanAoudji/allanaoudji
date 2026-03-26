import SkeletonContactLink from "./SkeletonContactLink";

export default function SkeletonContactHome() {
	return (
		<div className="flex w-1/2 flex-col">
			<SkeletonContactLink className="mb-5" />
			<SkeletonContactLink className="mb-5" />
			<SkeletonContactLink />
		</div>
	);
}
