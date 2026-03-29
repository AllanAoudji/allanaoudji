import { Metadata } from "next";
import EmptyAbout from "@/components/EmptyAbout";
import PortableTextContent from "@/components/PortableTextContent";
import { getAbout } from "@/studio/lib/queries";

export const metadata: Metadata = {
	title: "À propos",
	description: "Graphiste & illustrateur — retrouvez mon parcours et mes inspirations.",
	openGraph: {
		title: "À propos | Allan Aoudji",
		type: "website",
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
	},
};

export default async function AboutPage() {
	const result = await getAbout();

	if (!result || !result.data || !result.data.content) {
		return <EmptyAbout />;
	}

	return <PortableTextContent value={result.data.content} />;
}
