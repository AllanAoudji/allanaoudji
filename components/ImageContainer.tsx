import Image from "next/image";
import { cn } from "@/lib/utils";
import { workGalleryImage, workMainImage } from "@/types/sanityType";

type AspectRatio = "4/3" | "3/4" | "4/5";

type Props = {
	image: workGalleryImage | workMainImage;
	priority?: boolean;
	ratio: AspectRatio;
	className?: string;
};

const getAspectRatio = (ratio: AspectRatio) => {
	switch (ratio) {
		case "3/4":
			return "aspect-3/4";
		case "4/3":
			return "aspect-4/3";
		case "4/5":
			return "aspect-4/5";
		default:
			return "aspect-3/4";
	}
};

export default function ImageContainer({
	image,
	priority = false,
	ratio,
	className,
}: Readonly<Props>) {
	return (
		<div className={cn(className, getAspectRatio(ratio), "bg-secondary w-full overflow-hidden")}>
			{!!image.height && !!image.width && !!image.url && (
				<Image
					alt={image.alt || "image"}
					blurDataURL={image.lqip || undefined}
					className="h-full w-full object-cover"
					height={image.height}
					placeholder={image.lqip ? "blur" : "empty"}
					priority={priority}
					src={image.url}
					width={image.width}
				/>
			)}
		</div>
	);
}
