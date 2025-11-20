import Grid from "./Grid";
import ImageContainer from "./ImageContainer";
import { workGallery } from "@/types/sanityType";

type Props = {
	images: workGallery | null;
};

export default function WorkImages({ images }: Readonly<Props>) {
	if (
		!images ||
		!images.length ||
		!images.filter(image => !!image.height && !!image.width && !!image.url).length
	) {
		return null;
	}

	return (
		<Grid>
			{images.map(image => (
				<ImageContainer key={image._id} image={image} ratio="3/4" />
			))}
		</Grid>
	);
}
