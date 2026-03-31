import { Metadata } from "next";
import EmptyPrivacyPolicy from "@/components/EmptyPrivacyPolicy";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getPrivacyPolicy } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/politique-de-confidentialite`,
	},
	description: "Politique de confidentialité d'Allan Aoudji.",
	openGraph: {
		title: "Politique de confidentialité | Allan Aoudji",
		type: "website",
	},
	title: "Politique de confidentialité",
};

export default async function PrivacyPolicyPage() {
	const result = await getPrivacyPolicy();

	if (!result || !result.data || !result.data.content) {
		return <EmptyPrivacyPolicy />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
