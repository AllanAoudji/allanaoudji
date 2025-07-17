import ImageContainer from "./ImageContainer";
import { workGallery } from "@/types/sanityType";

type Props = {
	images: workGallery | null;
};

export default function WorkImages({ images }: Readonly<Props>) {
	if (
		!images ||
		images.length == 0 ||
		images.filter(image => !!image.height && !!image.width && !!image.url)
	) {
		return null;
	}

	return (
		<div className="items-gap grid-default">
			{images.map(image => (
				<ImageContainer key={image._id} image={image} ratio="3/4" />
			))}
		</div>
	);
}
