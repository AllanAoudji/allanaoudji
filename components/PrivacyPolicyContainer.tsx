import LegalPageContainer from "./LegalPageContainer";
import { getPrivacyPolicy } from "@/sanity/lib/queries";

export default async function PrivacyPolicyContainer() {
	const result = await getPrivacyPolicy();

	if (!result || !result.privacyPolicy) {
		return <p>pas de contenu</p>;
	}

	return <LegalPageContainer portableText={result.privacyPolicy} updatedAt={result._updatedAt} />;
}
