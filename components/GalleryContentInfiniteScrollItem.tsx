import GalleryImages from "./GalleryImages";
import GalleryText from "./GalleryText";
import SubTitle from "./SubTitle";
import { Work } from "@/types/sanityType";

type Props = {
	work: Work;
	isFirst?: boolean;
};

export default function GalleryContentInfiniteScrollItem({ isFirst, work }: Readonly<Props>) {
	return (
		<section className="pb-16 last-of-type:pb-0">
			<SubTitle>{work.title}</SubTitle>
			<GalleryText text={work.text} />
			<GalleryImages images={work.gallery} isFirst={isFirst} />
		</section>
	);
}
