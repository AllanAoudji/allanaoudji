import Link from "next/link";
import ImageContainer from "./ImageContainer";
import { getWorks } from "@/sanity/lib/queries";

export default async function WorksSection() {
	const query = await getWorks("gallery");

	if (!query || !query.works || query.works.length == 0) {
		return null;
	}

	return (
		<section className="section-separator section-container items-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{query.works.map(work => (
				<Link key={work._id} href={`/gallery/${work.slug}`}>
					<h2>{work.title}</h2>
					{work.mainImage && <ImageContainer image={work.mainImage} ratio="4/3" />}
				</Link>
			))}
		</section>
	);
}
