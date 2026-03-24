import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	ratio?: Ratio;
};
type Ratio = "3/4" | "4/3" | "1/1";

const convertRatio = (ratio: Ratio) => {
	switch (ratio) {
		default:
		case "1/1":
			return "aspect-1/1";
		case "3/4":
			return "aspect-3/4";
		case "4/3":
			return "aspect-4/3";
	}
};

export default function SkeletonImage({ className, ratio = "1/1" }: Readonly<Props>) {
	return <div className={cn("bg-secondary", convertRatio(ratio), className)} />;
}
