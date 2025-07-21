import SubTitle from "./SubTitle";
import WorkImages from "./WorkImages";
import WorkText from "./WorkText";
import { work } from "@/types/sanityType";

type Props = {
	className?: string;
	separator?: boolean;
	work: work;
};

export default function WorksGallerySection({
	className,
	separator = true,
	work,
}: Readonly<Props>) {
	return (
		<section className={`${className} section-container ${separator && "section-separator"}`}>
			<SubTitle className="pb-4">{work.title}</SubTitle>
			<WorkText text={work.text} />
			<WorkImages images={work.gallery} />
		</section>
	);
}
