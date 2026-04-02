import { Metadata } from "next";
import { isPortableTextEmpty } from "@/lib/utils";
import EmptyGeneralConditionsOfSale from "@/components/EmptyGeneralConditionsOfSale";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getGeneralConditionOfSale } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/conditions-generales-de-vente`,
	},
	description: "Conditions générales de vente d'Allan Aoudji.",
	openGraph: {
		title: "Conditions générales de vente | Allan Aoudji",
		type: "website",
	},
	title: "Conditions générales de vente",
};

export default async function GeneralConditionsOfSalePage() {
	const result = await getGeneralConditionOfSale();

	if (!result?.data?.content || isPortableTextEmpty(result.data.content)) {
		return <EmptyGeneralConditionsOfSale />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
