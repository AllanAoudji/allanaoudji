import PortableTextContent from "./PortableTextContent";
import { getAbout } from "@/sanity/lib/queries";

export default async function AboutContainer() {
	const result = await getAbout();

	if (!result || !result.about) {
		return <p>pas de contenu</p>;
	}

	return <PortableTextContent value={result.about} />;
}
