import SubTitle from "./SubTitle";
import WorkImages from "./WorkImages";
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
			{work.text && <p>{work.text}</p>}
			<WorkImages images={work.gallery} />
		</section>
	);
}
