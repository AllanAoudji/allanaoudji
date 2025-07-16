import ImageContainer from "./ImageContainer";
import { SanityImage } from "@/sanity/lib/queries";

type Props = {
	images: SanityImage[];
};

export default function WorkImages({ images }: Readonly<Props>) {
	if (images.length == 0) {
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
