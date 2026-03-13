import { cn } from "@/lib/utils";
import FilterCollection from "./FilterCollection";
import FilterOrdering from "./FilterOrdering";

type Props = {
	className?: string;
	direction?: "column" | "row";
	type: "collections" | "ordering";
};

export default function Filter({ className, direction = "row", type }: Readonly<Props>) {
	return (
		<nav className={cn("flex", className)}>
			{type === "collections" ? <FilterCollection direction={direction} /> : <FilterOrdering />}
		</nav>
	);
}
