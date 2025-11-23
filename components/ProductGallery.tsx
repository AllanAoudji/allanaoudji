import Grid from "./Grid";
import ImageContainer from "./ImageContainer";
import shopifyImage from "@/types/shopifyImage";

type Props = {
	className?: string;
	images: shopifyImage[];
};

export default function ProductGallery({ className, images }: Readonly<Props>) {
	return (
		<Grid tag="ul" type="largest" className={className}>
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
		</Grid>
	);
}
