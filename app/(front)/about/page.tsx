import EmptyAbout from "@/components/EmptyAbout";
import PortableTextContent from "@/components/PortableTextContent";
import { getAbout } from "@/sanity/lib/queries";

export default async function AboutPage() {
	const result = await getAbout();

	if (!result || !result.data || !result.data.about) {
		return <EmptyAbout />;
	}

	return <PortableTextContent value={result.data.about} />;
}
