import { cn } from "@/lib/utils";
import SkeletonText from "./SkeletonText";

type Props = {
	className?: string;
};

export default function SkeletonContactLink({ className }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<SkeletonText className="mb-0.5" type="h1" />
			<SkeletonText size={95} type="h2" />
		</div>
	);
}
