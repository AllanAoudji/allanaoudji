import { cn } from "@/lib/utils";
import CollectionsFilterCollections from "./CollectionsFilterCollections";
import CollectionsFilterOrdering from "./CollectionsFilterOrdering";

type Props = {
	className?: string;
	direction?: "column" | "row";
	type: "collections" | "ordering";
};

export default function CollectionsFilter({ className, direction = "row", type }: Readonly<Props>) {
	return (
		<nav className={cn("flex", className)}>
			{type === "collections" ? (
				<CollectionsFilterCollections direction={direction} />
			) : (
				<CollectionsFilterOrdering />
			)}
		</nav>
	);
}
