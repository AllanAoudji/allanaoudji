import { Metadata } from "next";
import EmptyLegalNotices from "@/components/EmptyLegalNotices";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getLegalNotices } from "@/studio/lib/queries";

export const metadata: Metadata = {
	title: "Mentions légales",
	description: "Mentions légales d'Allan Aoudji.",
	openGraph: {
		title: "Mentions légales | Allan Aoudji",
		type: "website",
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/mentions-legales`,
	},
};

export default async function LegalNoticesPage() {
	const result = await getLegalNotices();

	if (!result || !result.data || !result.data.content) {
		return <EmptyLegalNotices />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
