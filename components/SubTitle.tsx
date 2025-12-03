import { cn } from "@/lib/utils";

type props = {
	children: string | string[];
	className?: string;
};

export default function SubTitle({ children, className }: Readonly<props>) {
	return <h2 className={cn(className, "text-xl tracking-wider uppercase")}>{children}</h2>;
}
