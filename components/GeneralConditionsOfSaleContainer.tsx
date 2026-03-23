import LegalPageContainer from "./LegalPageContainer";
import { getGeneralConditionOfSale } from "@/sanity/lib/queries";

export default async function GeneralConditionsOfSaleContainer() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.generalConditionsOfSale) {
		return <p>pas de contenu</p>;
	}

	return (
		<LegalPageContainer portableText={result.generalConditionsOfSale} updatedAt={result._updatedAt} />
	);
}
