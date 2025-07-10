import SubTitle from "./SubTitle";
import WorkImages from "./WorkImages";
import WorkText from "./WorkText";
import { Work } from "@/types/work";

type Props = {
	className?: string;
	separator?: boolean;
	work: Work;
};

export default function GallerySection({ className, separator = true, work }: Readonly<Props>) {
	return (
		<section className={`${className} section-container ${separator && "section-separator"}`}>
			<SubTitle className="pb-4">{work.title}</SubTitle>
			{work.text && <WorkText className="pb-4">{work.text}</WorkText>}
			<WorkImages />
		</section>
	);
}
