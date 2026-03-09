import { cn } from "@/lib/utils";

type props = {
	children: string | string[];
	className?: string;
};

export default function SubTitle({ children, className }: Readonly<props>) {
	return <h2 className={cn("mb-4 text-lg tracking-wider uppercase", className)}>{children}</h2>;
}
