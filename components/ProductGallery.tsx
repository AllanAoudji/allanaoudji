import ImageContainer from "./ImageContainer";
import { shopifyImage } from "@/types/shopifyImage";

type Props = {
	className?: string;
	images: shopifyImage[];
};

export default function ProductGallery({ className, images }: Readonly<Props>) {
	return (
		<ul className={`${className} items-gap grid grid-cols-2`}>
			{images.slice(0, 6).map(image => (
				<ImageContainer
					key={image.id}
					image={{
						alt: image.altText || "",
						height: image.height,
						url: image.url,
						width: image.width,
						lqip: null,
					}}
					ratio="3/4"
					priority={true}
				/>
			))}
		</ul>
	);
}
