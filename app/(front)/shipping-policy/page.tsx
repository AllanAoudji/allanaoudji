import { Metadata } from "next";
import { DEFAULT_OG } from "@/lib/constants";
import { isPortableTextEmpty } from "@/lib/utils";
import EmptyShippingPolicy from "@/components/EmptyShippingPolicy";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getShippingPolicy } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shipping-policy`,
	},
	description: "Politique d’expédition d'Allan Aoudji.",
	openGraph: {
		...DEFAULT_OG,
		title: "Politique d’expédition | Allan Aoudji",
	},
	title: "Politique d’expédition",
};

export default async function ShippingPolicyPage() {
	const result = await getShippingPolicy();

	if (!result?.data?.content || isPortableTextEmpty(result.data.content)) {
		return <EmptyShippingPolicy />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
