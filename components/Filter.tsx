import { cn } from "@/lib/utils";
import FilterCollection from "./FilterCollection";
import FilterOrdering from "./FilterOrdering";

type Props = {
	className?: string;
	type: "collections" | "ordering";
};

export default function Filter({ className, type }: Readonly<Props>) {
	return (
		<nav className={cn("flex", className)}>
			{type === "collections" ? <FilterCollection /> : <FilterOrdering />}
		</nav>
	);
}
