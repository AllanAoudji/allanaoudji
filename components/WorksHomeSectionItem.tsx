import Link from "next/link";
import ImageContainer from "./ImageContainer";
import { work } from "@/types/sanityType";

type Props = {
	work: work;
};

export default function WorksHomeSectionItem({ work }: Readonly<Props>) {
	return (
		<Link key={work._id} href={`/gallery/${work.slug}`}>
			<h3>{work.title}</h3>
			{!!work.mainImage && <ImageContainer image={work.mainImage} ratio="4/3" />}
		</Link>
	);
}
