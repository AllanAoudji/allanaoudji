import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Size = "small" | "normal" | "large";

type Props = {
	className?: string;
	size?: Size;
	type: "plus" | "minus" | "delete";
};

const convertSize = (size: Size): number => {
	switch (size) {
		case "large":
			return 20;
		default:
		case "normal":
			return 16;
		case "small":
			return 12;
	}
};

export default function QuantityIcon({ className, size = "normal", type }: Readonly<Props>) {
	if (type === "plus") {
		return <IconPlus className={cn(className)} size={convertSize(size)} />;
	}
	if (type === "minus") {
		return <IconMinus className={cn(className)} size={convertSize(size)} />;
	}
	return <IconX className={cn(className)} size={convertSize(size)} />;
}
