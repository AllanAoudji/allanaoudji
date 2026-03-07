import { CollectionsProvider } from "@/lib/contexts/collections-context";
import { getCollections } from "@/lib/shopify";

type Props = {
	children: React.ReactNode;
};

export default async function CollectionsDispenser({ children }: Readonly<Props>) {
	const collections = await getCollections();

	return <CollectionsProvider initialValue={collections}>{children}</CollectionsProvider>;
}
