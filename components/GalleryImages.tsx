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
					<div key={image._id} className="overflow-hidden">
						<ImageContainer
							image={image}
							onClick={() => handleClick(image._id)}
							ratio="3/4"
							className="cursor-pointer transition-transform duration-500 hover:scale-[103%]"
						/>
					</div>
				))}
			</Grid>
		</>
	);
}
