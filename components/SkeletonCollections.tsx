import SkeletonProductLink from "./SkeletonProductLink";

export default function SkeletonCollections() {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
			<SkeletonProductLink />
		</div>
	);
}
