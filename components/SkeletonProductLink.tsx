import { cn } from "@/lib/utils";
import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

type Props = {
	className?: string;
};

export default function SkeletonProductLink({ className }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<SkeletonImage className="mb-2.5" ratio="3/4" />
			<SkeletonText className="mb-0.5" type="current" />
			<SkeletonText size={50} type="small" />
		</div>
	);
}
