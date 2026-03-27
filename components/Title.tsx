import { cn } from "@/lib/utils";

type props = {
	children: string | string[];
	className?: string;
};

export default function Title({ children, className }: Readonly<props>) {
	return (
		<h1 className={cn("text-secondary mb-6 text-2xl font-black uppercase", className)}>{children}</h1>
	);
}
