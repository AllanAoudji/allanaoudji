import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	type?: Type;
	size?: Size;
};

type Size = 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
type Type = "h1" | "h2" | "current" | "small";

const convertSize = (size: Size) => {
	switch (size) {
		case 30:
			return "w-[30%]";
		case 35:
			return "w-[35%]";
		case 40:
			return "w-[40%]";
		case 45:
			return "w-[45%]";
		case 50:
			return "w-1/2";
		case 55:
			return "w-[55%]";
		case 60:
			return "w-[60%]";
		case 65:
			return "w-[65%]";
		case 70:
			return "w-[70%]";
		case 75:
			return "w-3/4";
		case 80:
			return "w-[80%]";
		case 85:
			return "w-[85%]";
		case 90:
			return "w-[90%]";
		case 95:
			return "w-[95%]";
		case 100:
			return "w-full";
	}
};

const convertType = (type: Type) => {
	switch (type) {
		case "h1":
			return "h-7";
		case "h2":
			return "h-6";
		default:
		case "current":
			return "h-4.5";
		case "small":
			return "h-4";
	}
};

export default function SkeletonText({ className, size = 100, type = "current" }: Readonly<Props>) {
	return (
		<div className={cn("bg-secondary rounded-md", convertSize(size), convertType(type), className)} />
	);
}
