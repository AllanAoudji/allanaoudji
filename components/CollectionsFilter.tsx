import { cn } from "@/lib/utils";
import CollectionsFilterCollections from "./CollectionsFilterCollections";
import CollectionsFilterOrdering from "./CollectionsFilterOrdering";

type Props = {
	className?: string;
	type: "collections" | "ordering";
};

export default function CollectionsFilter({ className, type }: Readonly<Props>) {
	return (
		<nav className={cn(className)}>
			{type === "collections" ? <CollectionsFilterCollections /> : <CollectionsFilterOrdering />}
		</nav>
	);
}
