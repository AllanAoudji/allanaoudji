import { formatDate } from "@/lib/utils";
import PortableTextContent from "@/components/PortableTextContent";
import { getPrivacyPolicy } from "@/sanity/lib/queries";

export default async function PrivacyPolicy() {
	const result = await getPrivacyPolicy();

	if (!result || !result.privacyPolicy) {
		return <p>pas de contenu</p>;
	}

	return (
		<>
			<div className="mb-4 text-sm italic">
				<p>Dernière mise à jour : {formatDate(result._updatedAt)}</p>
			</div>
			<PortableTextContent value={result.privacyPolicy} />
		</>
	);
}
