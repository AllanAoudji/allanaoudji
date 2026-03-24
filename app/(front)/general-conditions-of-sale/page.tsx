import EmptyGeneralConditionsOfSale from "@/components/EmptyGeneralConditionsOfSale";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getGeneralConditionOfSale } from "@/sanity/lib/queries";

export default async function GeneralConditionsOfSalePage() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.generalConditionsOfSale) {
		return <EmptyGeneralConditionsOfSale />;
	}

	return (
		<LegalPageContainer portableText={result.generalConditionsOfSale} updatedAt={result._updatedAt} />
	);
}
