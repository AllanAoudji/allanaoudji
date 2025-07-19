import Image from "next/image";
import { workGalleryImage, workMainImage } from "@/types/sanityType";

type AspectRatio = "4/3" | "3/4" | "4/5";

type Props = {
	image: workGalleryImage | workMainImage;
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

export default function ImageContainer({ image, ratio, className }: Readonly<Props>) {
	return (
		<div className={`${className} ${getAspectRatio(ratio)} bg-secondary w-full overflow-hidden`}>
			{!!image.height && !!image.width && !!image.url && (
				<Image
					alt={image.alt || "image"}
					blurDataURL={image.lqip || undefined}
					className="h-full w-full object-cover"
					height={image.height}
					placeholder={image.lqip ? "blur" : "empty"}
					src={image.url}
					width={image.width}
				/>
			)}
		</div>
	);
}
