import { formatDate } from "@/lib/utils";
import PortableTextContent from "@/components/PortableTextContent";
import { getLegalNotices } from "@/sanity/lib/queries";

export default async function LegalNotices() {
	const result = await getLegalNotices();

	if (!result || !result.legalNotices) {
		return <p>pas de contenu</p>;
	}

	return (
		<>
			<div className="mb-4 text-sm italic">
				<p>Dernière mise à jour : {formatDate(result._updatedAt)}</p>
			</div>
			<PortableTextContent value={result.legalNotices} />
		</>
	);
}
