import SkeletonImage from "@/components/SkeletonImage";
import SkeletonProductLink from "@/components/SkeletonProductLink";
import SkeletonText from "@/components/SkeletonText";
import SubTitle from "@/components/SubTitle";

export default function ProductSingleLoading() {
	return (
		<div>
			<div className="grid grid-cols-6 gap-8 md:gap-4">
				<div className="col-span-6 md:col-span-3 lg:col-span-4">
					<div className="hidden grid-cols-2 gap-2 lg:grid">
						<SkeletonImage ratio="3/4" />
						<SkeletonImage ratio="3/4" />
						<SkeletonImage ratio="3/4" />
						<SkeletonImage ratio="3/4" />
					</div>
					<div className="block lg:hidden">
						<SkeletonImage ratio="3/4" />
						<div className="mt-2 grid grid-cols-4 gap-2">
							<SkeletonImage ratio="4/3" />
							<SkeletonImage ratio="4/3" />
							<SkeletonImage ratio="4/3" />
							<SkeletonImage ratio="4/3" />
						</div>
					</div>
				</div>
				<div className="col-span-6 md:col-span-3 lg:col-span-2">
					<SkeletonText className="mt-0.5 mb-0.5" size={85} type="h1" />
					<SkeletonText className="mb-10" size={35} type="current" />

					<SkeletonText className="mb-2" size={80} type="h2" />
					<SkeletonText className="mb-2" size={90} type="h2" />
					<SkeletonText className="mb-1.5" size={85} />
					<SkeletonText className="mb-1.5" />
					<SkeletonText className="mb-1.5" size={95} />
					<SkeletonText className="mb-1.5" size={80} />
					<SkeletonText className="mb-1.5" />
					<SkeletonText className="mb-1.5" size={90} />
					<SkeletonText className="mb-1.5" size={95} />
					<SkeletonText className="mb-1.5" size={85} />
					<SkeletonText size={55} />
				</div>
			</div>
			<div className="mt-16 lg:mt-12">
				<SubTitle>Vous aimerez peut-être...</SubTitle>
				<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
					<SkeletonProductLink />
					<SkeletonProductLink />
					<SkeletonProductLink />
					<SkeletonProductLink />
				</div>
			</div>
		</div>
	);
}
