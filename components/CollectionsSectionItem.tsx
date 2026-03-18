import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import Collection from "@/types/collection";

type Props = {
	collection: Collection;
	className?: string;
};

export default function CollectionsSectionItem({ collection, className }: Readonly<Props>) {
	return (
		<Link className={cn(className)} href={collection.path}>
			<h3>{collection.title}</h3>
			{!!collection.image ? (
				<ImageContainer image={collection.image} ratio="4/3" />
			) : (
				<div className="bg-secondary aspect-4/3" />
			)}
		</Link>
	);
}
