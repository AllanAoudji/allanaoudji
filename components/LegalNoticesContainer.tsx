import LegalPageContainer from "./LegalPageContainer";
import { getLegalNotices } from "@/sanity/lib/queries";

export default async function LegalNoticesContainer() {
	const result = await getLegalNotices();

	if (!result || !result.legalNotices) {
		return <p>pas de contenu</p>;
	}

	return <LegalPageContainer portableText={result.legalNotices} updatedAt={result._updatedAt} />;
}
