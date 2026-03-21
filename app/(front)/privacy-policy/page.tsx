import PortableTextContent from "@/components/PortableTextContent";
import { getPrivacyPolicy } from "@/sanity/lib/queries";

export default async function PrivacyPolicy() {
	const result = await getPrivacyPolicy();

	if (!result || !result.privacyPolicy) {
		return <p>pas de contenu</p>;
	}

	return <PortableTextContent value={result.privacyPolicy} />;
}
