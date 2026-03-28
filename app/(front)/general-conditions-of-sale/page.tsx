import EmptyGeneralConditionsOfSale from "@/components/EmptyGeneralConditionsOfSale";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getGeneralConditionOfSale } from "@/sanity/lib/queries";

export default async function GeneralConditionsOfSalePage() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.data || !result.data.generalConditionsOfSale) {
		return <EmptyGeneralConditionsOfSale />;
	}

	return (
		<LegalPageContainer
			portableText={result.data.generalConditionsOfSale}
			updatedAt={result.data._updatedAt}
		/>
	);
}
