import { Metadata } from "next";
import { DEFAULT_OG } from "@/lib/constants";
import { isPortableTextEmpty } from "@/lib/utils";
import EmptyAbout from "@/components/EmptyAbout";
import PortableTextContent from "@/components/PortableTextContent";
import { getAbout } from "@/studio/lib/queries";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
	},
	description: "Graphiste & illustrateur — retrouvez mon parcours et mes inspirations.",
	openGraph: {
		...DEFAULT_OG,
		title: "À propos | Allan Aoudji",
	},
	title: "À propos",
};

export default async function AboutPage() {
	const result = await getAbout();

	if (!result?.data?.content || isPortableTextEmpty(result.data.content)) {
		return <EmptyAbout />;
	}

	return <PortableTextContent value={result.data.content} />;
}
