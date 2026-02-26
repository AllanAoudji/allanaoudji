import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";
import WorkImages from "./WorkImages";
import WorkText from "./WorkText";
import { work } from "@/types/sanityType";

type Props = {
	className?: string;
	separator?: boolean;
	work: work;
};

export default function WorksGallerySectionContainerItem({
	className,
	separator = true,
	work,
}: Readonly<Props>) {
	return (
		<section
			className={cn(className, "vertical-padding", {
				"section-separator": separator,
			})}
		>
			<SubTitle className="pb-8">{work.title}</SubTitle>
			<WorkText text={work.text} />
			<WorkImages images={work.gallery} />
		</section>
	);
}
