import { Metadata } from "next";
import { DEFAULT_OG } from "@/lib/constants";
import { isPortableTextEmpty } from "@/lib/utils";
import EmptyPrivacyPolicy from "@/components/EmptyPrivacyPolicy";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getPrivacyPolicy } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/politique-de-confidentialite`,
	},
	description: "Politique de confidentialité d'Allan Aoudji.",
	openGraph: {
		...DEFAULT_OG,
		title: "Politique de confidentialité | Allan Aoudji",
		url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`,
	},
	title: "Politique de confidentialité",
};

export default async function PrivacyPolicyPage() {
	const result = await getPrivacyPolicy();

	if (!result?.data?.content || isPortableTextEmpty(result.data.content)) {
		return <EmptyPrivacyPolicy />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
