import { Metadata } from "next";
import EmptyShippingPolicy from "@/components/EmptyShippingPolicy";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getShippingPolicy } from "@/studio/lib/queries";

export const metadata: Metadata = {
	title: "Politique d’expédition",
	description: "Politique d’expédition d'Allan Aoudji.",
	openGraph: {
		title: "Politique d’expédition | Allan Aoudji",
		type: "website",
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shipping-policy`,
	},
};

export default async function ShippingPolicyPage() {
	const result = await getShippingPolicy();

	if (!result || !result.data || !result.data.content) {
		return <EmptyShippingPolicy />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
