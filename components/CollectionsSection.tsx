import { redirect } from "next/navigation";
import { getCollections } from "@/lib/shopify";
import CollectionsSectionItem from "./CollectionsSectionItem";
import Grid from "./Grid";
import Title from "./Title";
import Collection from "@/types/collection";

export default async function CollectionsSection() {
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
		<>
			<Title>Collections</Title>
			<Grid className="section-container" tag="section">
				{collections.map(collection => (
					<CollectionsSectionItem key={collection.handle} collection={collection} />
				))}
			</Grid>
		</>
	);
}
