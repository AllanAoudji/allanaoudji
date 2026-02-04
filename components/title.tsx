import { cn } from "@/lib/utils";

type props = {
	children: string | string[];
	className?: string;
};

export default function Title({ children, className }: Readonly<props>) {
	return (
		<h1 className={cn("text-quaternary text-5xl font-bold tracking-wider uppercase", className)}>
			{children}
		</h1>
	);
}
