import Image from "next/image";
import { workGalleryImage, workMainImage } from "@/types/sanityType";

type Props = {
	image: workGalleryImage | workMainImage;
	ratio?: "4/3" | "3/4";
};

export default function ImageContainer({ image, ratio = "3/4" }: Props) {
	if (!image.height || !image.width || !image.url) {
		return null;
	}

	return (
		<div
			className={`bg-secondary flex ${ratio === "3/4" ? "aspect-3/4" : "aspect-4/3"} w-full items-center justify-center overflow-hidden`}
		>
			<Image
				alt={image.alt || "image"}
				src={image.url}
				width={image.width}
				height={image.height}
				placeholder="blur"
				blurDataURL={image.lqip || undefined}
			/>
		</div>
	);
}
