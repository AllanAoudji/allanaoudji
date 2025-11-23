import { redirect } from "next/navigation";
import { getCollections } from "@/lib/shopify";
import CollectionsSectionContainer from "./CollectionsSectionContainer";
import CollectionsSectionItem from "./CollectionsSectionItem";
import Grid from "./Grid";
import Collection from "@/types/collection";

type Props = {
	className?: string;
};

export default async function CollectionsSection({ className }: Readonly<Props>) {
	let collections: Collection[];
	try {
		collections = await getCollections();
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!collections.length) redirect("/shop");

	return (
		<CollectionsSectionContainer className={className}>
			<Grid className="section-container">
				{collections.map(collection => (
					<CollectionsSectionItem key={collection.handle} collection={collection} />
				))}
			</Grid>
		</CollectionsSectionContainer>
	);
}
