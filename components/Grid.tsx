import { HTMLAttributeAnchorTarget } from "react";
import { cn } from "@/lib/utils";

type Type = "small" | "default" | "large";

type PropsDefault = {
	children: React.ReactNode;
	className?: string;
	tag?: "div" | "section";
	type?: Type;
	href?: never;
	target?: never;
};
type PropsLink = {
	children: React.ReactNode;
	className?: string;
	tag: "a";
	type?: Type;
	href: string;
	target?: HTMLAttributeAnchorTarget;
};

type Props = PropsDefault | PropsLink;

const getStyle = (type: Type): string => {
	switch (type) {
		default:
		case "default":
			return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
		case "large":
			return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
		case "small":
			return "grid-cols-5";
	}
};

export default function Grid({
	children,
	className,
	tag = "div",
	type = "default",
	href,
	target,
}: Readonly<Props>) {
	const DynamicTag = tag;
	return (
		<DynamicTag className={cn(className, getStyle(type), "grid gap-4")} href={href} target={target}>
			{children}
		</DynamicTag>
	);
}
