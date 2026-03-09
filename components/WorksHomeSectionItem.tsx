import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import { work } from "@/types/sanityType";

type Props = {
	work: work;
};

export default function WorksHomeSectionItem({ work }: Readonly<Props>) {
	return (
		<Link key={work._id} href={`/gallery/${work.slug}`} className="group block">
			{!!work.mainImage && (
				<div className="mb-1.5 overflow-hidden">
					<ImageContainer
						image={work.mainImage}
						ratio="4/3"
						className="animation scale-100 transition-all duration-300 group-hover:scale-105"
					/>
				</div>
			)}
			<div className="flex text-xs font-bold">
				<h3
					className={cn(
						"overflow-hidden text-ellipsis whitespace-nowrap uppercase",
						"relative",
						"group-hover:after:origin-left group-hover:after:scale-x-100",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
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
