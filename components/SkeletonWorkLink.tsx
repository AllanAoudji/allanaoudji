import { cn } from "@/lib/utils";
import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

type Props = {
	className?: string;
};

export default function SkeletonWorkLink({ className }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<SkeletonImage className="mb-1.5" ratio="4/3" />
			<SkeletonText type="small" />
		</div>
	);
}
