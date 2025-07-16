import Link from "next/link";
import ImageContainer from "./ImageContainer";
import { SanityWork } from "@/.sanity/lib/queries";

type Props = {
	work: SanityWork;
};

export default function WorkSectionItem({ work }: Readonly<Props>) {
	return (
		<Link href={`/gallery/${work.slug}`}>
			<h2>{work.title}</h2>
			{work.mainImage && <ImageContainer image={work.mainImage} ratio="4/3" />}
		</Link>
	);
}
