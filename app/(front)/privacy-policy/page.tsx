import EmptyPrivacyPolicy from "@/components/EmptyPrivacyPolicy";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getPrivacyPolicy } from "@/studio/lib/queries";

export default async function PrivacyPolicyPage() {
	const result = await getPrivacyPolicy();

	if (!result || !result.data || !result.data.content) {
		return <EmptyPrivacyPolicy />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
