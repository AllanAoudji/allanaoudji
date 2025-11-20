import { cn } from "@/lib/utils";
import FilterCollection from "./FilterCollection";
import FilterOrdering from "./FilterOrdering";

type Props = {
	className?: string;
	type: "collections" | "ordering";
};

export default function Filter({ className, type }: Readonly<Props>) {
	return (
		<nav className={cn(className)}>
			<h4>{type}</h4>
			{type === "collections" ? <FilterCollection /> : <FilterOrdering />}
		</nav>
	);
}
