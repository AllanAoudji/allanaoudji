import EmptyGeneralConditionsOfSale from "@/components/EmptyGeneralConditionsOfSale";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getGeneralConditionOfSale } from "@/studio/lib/queries";

export default async function GeneralConditionsOfSalePage() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.data || !result.data.content) {
		return <EmptyGeneralConditionsOfSale />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
