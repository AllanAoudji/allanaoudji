import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import { Work } from "@/types/sanityType";

type Props = {
	work: Work;
};

export default function GalleryHomeSectionItem({ work }: Readonly<Props>) {
	return (
		<Link className="group block" href={`/gallery/${work.slug}`} key={work._id}>
			{!!work.mainImage && (
				<div className="mb-1.5 overflow-hidden">
					<ImageContainer
						className="animation scale-[103%] transition-all duration-500 group-hover:scale-100"
						image={work.mainImage}
						ratio="4/3"
					/>
				</div>
			)}
			<div className="flex text-xs font-bold">
				<h3
					className={cn(
						"overflow-hidden text-ellipsis whitespace-nowrap uppercase",
						"relative",
						"group-hover:after:origin-left group-hover:after:scale-x-100",
						"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
					)}
				>
					{work.title}
				</h3>
			</div>
		</Link>
	);
}
