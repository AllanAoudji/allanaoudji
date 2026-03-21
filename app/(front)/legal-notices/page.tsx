import PortableTextContent from "@/components/PortableTextContent";
import { getLegalNotices } from "@/sanity/lib/queries";

export default async function LegalNotices() {
	const result = await getLegalNotices();

	if (!result || !result.legalNotices) {
		return <p>pas de contenu</p>;
	}

	return <PortableTextContent value={result.legalNotices} />;
}
