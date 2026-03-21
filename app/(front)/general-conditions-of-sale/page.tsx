import PortableTextContent from "@/components/PortableTextContent";
import { getGeneralConditionOfSale } from "@/sanity/lib/queries";

export default async function GeneralConditionsOfSale() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.generalConditionsOfSale) {
		return <p>pas de contenu</p>;
	}

	return <PortableTextContent value={result.generalConditionsOfSale} />;
}
