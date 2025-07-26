import { redirect } from "next/navigation";
import { getCollections } from "@/lib/shopify";
import CollectionsSectionItem from "./CollectionsSectionItem";
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
			<section className="section-container">
				<div className="grid-default items-gap">
					{collections.map(collection => (
						<CollectionsSectionItem key={collection.handle} collection={collection} />
					))}
				</div>
			</section>
		</>
	);
}
