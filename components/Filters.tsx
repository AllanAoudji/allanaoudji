import { cn } from "@/lib/utils";
import Filter from "./Filter";

type Props = {
	className?: string;
};

export default function Filters({ className }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<Filter className="mb-16" type="collections" />
			<Filter type="ordering" />
		</div>
	);
}
