import { cn } from "@/lib/utils";
import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

type Props = {
	className?: string;
};

export default function SkeletonProductLink({ className }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<SkeletonImage className="mb-2" ratio="3/4" />
			<SkeletonText className="mb-1" type="current" />
			<SkeletonText size={50} type="small" />
		</div>
	);
}
