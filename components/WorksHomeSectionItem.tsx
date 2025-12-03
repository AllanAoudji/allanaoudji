import Link from "next/link";
import ImageContainer from "./ImageContainer";
import { work } from "@/types/sanityType";

type Props = {
	work: work;
};

export default function WorksHomeSectionItem({ work }: Readonly<Props>) {
	return (
		<Link key={work._id} href={`/gallery/${work.slug}`} className="group block">
			{!!work.mainImage && (
				<div className="overflow-hidden">
					<ImageContainer
						image={work.mainImage}
						ratio="4/3"
						className="scale-105 transition-all duration-300 ease-in-out group-hover:scale-100"
					/>
				</div>
			)}
			<h3 className="pt-2 tracking-wider uppercase">{work.title}</h3>
		</Link>
	);
}
