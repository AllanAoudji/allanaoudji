"use client";

import { useCallback, useEffect } from "react";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import Grid from "./Grid";
import ImageContainer from "./ImageContainer";
import { workGallery } from "@/types/sanityType";

type Props = {
	images: workGallery | null;
};

export default function GalleryImages({ images }: Readonly<Props>) {
	const { setImage, resetImages, appendImages } = useLightBox();

	const handleClick = useCallback(
		(id: string) => {
			setImage(id);
		},
		[setImage],
	);

	useEffect(() => {
		appendImages(images || []);
	}, [appendImages, images]);

	useEffect(() => {
		return () => resetImages();
	}, [resetImages]);

	if (
		!images ||
		!images.length ||
		!images.filter(image => !!image.height && !!image.width && !!image.url).length
	) {
		return null;
	}

	return (
		<>
			<Grid>
				{images.map(image => (
					<ImageContainer
						image={image}
						key={image._id}
						onClick={() => handleClick(image._id)}
						ratio="3/4"
					/>
				))}
			</Grid>
		</>
	);
}
