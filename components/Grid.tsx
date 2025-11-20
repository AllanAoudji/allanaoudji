import { cn } from "@/lib/utils";

type Type = "small" | "default" | "large" | "largest";

type Props = {
	children: React.ReactNode;
	className?: string;
	tag?: "div" | "section" | "ul";
	type?: Type;
	href?: never;
	target?: never;
};

const getStyle = (type: Type): string => {
	switch (type) {
		default:
		case "default":
			return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
		case "large":
			return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
		case "small":
			return "grid-cols-5";
		case "largest":
			return "grid-cols-2";
	}
};

export default function Grid({
	children,
	className,
	tag = "div",
	type = "default",
}: Readonly<Props>) {
	const DynamicTag = tag;
	return <DynamicTag className={cn(className, getStyle(type), "grid gap-4")}>{children}</DynamicTag>;
}
