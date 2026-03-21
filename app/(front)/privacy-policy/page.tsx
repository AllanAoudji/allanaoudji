import LegalPageContainer from "@/components/LegalPageContainer";
import { getPrivacyPolicy } from "@/sanity/lib/queries";

export default async function PrivacyPolicy() {
	const result = await getPrivacyPolicy();

	if (!result || !result.privacyPolicy) {
		return <p>pas de contenu</p>;
	}

	return <LegalPageContainer portableText={result.privacyPolicy} updatedAt={result._updatedAt} />;
}
