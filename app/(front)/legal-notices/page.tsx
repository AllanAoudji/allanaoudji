import LegalPageContainer from "@/components/LegalPageContainer";
import { getLegalNotices } from "@/sanity/lib/queries";

export default async function LegalNotices() {
	const result = await getLegalNotices();

	if (!result || !result.legalNotices) {
		return <p>pas de contenu</p>;
	}

	return <LegalPageContainer portableText={result.legalNotices} updatedAt={result._updatedAt} />;
}
