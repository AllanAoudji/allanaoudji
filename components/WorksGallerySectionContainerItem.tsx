import SubTitle from "./SubTitle";
import WorkImages from "./WorkImages";
import WorkText from "./WorkText";
import { work } from "@/types/sanityType";

type Props = {
	work: work;
};

export default function WorksGallerySectionContainerItem({ work }: Readonly<Props>) {
	return (
		<section className="py-8 first:pt-0 last:pb-0">
			<SubTitle>{work.title}</SubTitle>
			<WorkText text={work.text} />
			<WorkImages images={work.gallery} />
		</section>
	);
}
