import { Metadata } from "next";
import { DEFAULT_OG } from "@/lib/constants";
import { isPortableTextEmpty } from "@/lib/utils";
import AboutContainer from "@/components/AboutContainer";
import EmptyAbout from "@/components/EmptyAbout";
import { getAbout } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
	},
	description: "Graphiste & illustrateur — retrouvez mon parcours et mes inspirations.",
	openGraph: {
		...DEFAULT_OG,
		title: "À propos | Allan Aoudji",
		url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
	},
	title: "À propos",
};

export default async function AboutPage() {
	const result = await getAbout();

	if (
		!result?.data?.text ||
		(isPortableTextEmpty(result.data.text) && !result.data.images?.length)
	) {
		return <EmptyAbout />;
	}

	return <AboutContainer images={result.data.images} text={result.data.text} />;
}
