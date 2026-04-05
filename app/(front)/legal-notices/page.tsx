import { Metadata } from "next";
import { DEFAULT_OG } from "@/lib/constants";
import { isPortableTextEmpty } from "@/lib/utils";
import EmptyLegalNotices from "@/components/EmptyLegalNotices";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getLegalNotices } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/mentions-legales`,
	},
	description: "Mentions légales d'Allan Aoudji.",
	openGraph: {
		...DEFAULT_OG,
		title: "Mentions légales | Allan Aoudji",
	},
	title: "Mentions légales",
};

export default async function LegalNoticesPage() {
	const result = await getLegalNotices();

	if (!result?.data?.content || isPortableTextEmpty(result.data.content)) {
		return <EmptyLegalNotices />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
