import Link from "next/link";
import { Work } from "@/types/work";

type Props = {
	work: Work;
};

export default function WorkSectionItem({ work }: Readonly<Props>) {
	return (
		<Link href={`/gallery/${work.id}`}>
			<h2>{work.title}</h2>
			<div className="bg-secondary aspect-3/2 w-full" />
		</Link>
	);
}
