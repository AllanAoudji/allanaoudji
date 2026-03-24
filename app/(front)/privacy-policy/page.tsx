import EmptyPrivacyPolicy from "@/components/EmptyPrivacyPolicy";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getPrivacyPolicy } from "@/sanity/lib/queries";

export default async function PrivacyPolicyPage() {
	const result = await getPrivacyPolicy();

	if (!result || !result.privacyPolicy) {
		return <EmptyPrivacyPolicy />;
	}

	return <LegalPageContainer portableText={result.privacyPolicy} updatedAt={result._updatedAt} />;
}
