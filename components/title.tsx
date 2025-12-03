import { cn } from "@/lib/utils";

type props = {
	children: string | string[];
	className?: string;
};

export default function Title({ children, className }: Readonly<props>) {
	return (
		<h1 className={cn("text-quaternary text-4xl font-bold uppercase", className)}>{children}</h1>
	);
}
