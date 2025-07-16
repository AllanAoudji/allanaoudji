import Image from "next/image";
import { SanityImage } from "@/sanity/lib/queries";

type Props = {
	image: SanityImage;
	ratio?: "4/3" | "3/4";
};

export default function ImageContainer({ image, ratio = "3/4" }: Props) {
	return (
		<div
			className={`bg-secondary flex aspect-${ratio} w-full items-center justify-center overflow-hidden`}
		>
			<Image
				alt={image.alt || "image"}
				src={image.url}
				width={image.width}
				height={image.height}
				placeholder="blur"
				blurDataURL={image.lqip}
			/>
		</div>
	);
}
