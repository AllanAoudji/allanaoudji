import EmptyAbout from "@/components/EmptyAbout";
import PortableTextContent from "@/components/PortableTextContent";
import { getAbout } from "@/sanity/lib/queries";

export default async function AboutPage() {
	const result = await getAbout();

	if (!result || !result.about) {
		return <EmptyAbout />;
	}

	return <PortableTextContent value={result.about} />;
}
