import EmptyAbout from "@/components/EmptyAbout";
import PortableTextContent from "@/components/PortableTextContent";
import { getAbout } from "@/studio/lib/queries";

export default async function AboutPage() {
	const result = await getAbout();

	console.log("about result", result);

	if (!result || !result.data || !result.data.content) {
		return <EmptyAbout />;
	}

	return <PortableTextContent value={result.data.content} />;
}
