import { formatDate } from "@/lib/utils";
import PortableTextContent from "@/components/PortableTextContent";
import { getGeneralConditionOfSale } from "@/sanity/lib/queries";

export default async function GeneralConditionsOfSale() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.generalConditionsOfSale) {
		return <p>pas de contenu</p>;
	}

	return (
		<>
			<div className="mb-4 text-sm italic">
				<p>Dernière mise à jour : {formatDate(result._updatedAt)}</p>
			</div>
			<PortableTextContent value={result.generalConditionsOfSale} />
		</>
	);
}
