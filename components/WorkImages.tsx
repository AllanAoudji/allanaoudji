"use client";

import { useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import ImageContainer from "./ImageContainer";
import LightBox from "./Lightbox";
import { workGallery, workGalleryImage } from "@/types/sanityType";

type Props = {
	images: workGallery | null;
};

export default function WorkImages({ images }: Readonly<Props>) {
	const [clickedImage, setClickedImage] = useState<workGalleryImage | null>(null);
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);

	const handleClick = useCallback((index: number) => {
		setClickedIndex(index);
	}, []);

	const resetClick = useCallback(() => {
		setClickedImage(null);
		setClickedIndex(null);
	}, []);

	const nextImage = useCallback(() => {
		if (!images) return;
		if (clickedIndex === null) return;
		setClickedIndex(prev => (prev !== null ? (prev + 1) % images.length : null));
	}, [clickedIndex, images]);

	const prevImage = useCallback(() => {
		if (!images) return;
		if (clickedIndex === null) return;
		setClickedIndex(prev => (prev !== null ? (prev - 1 + images.length) % images.length : null));
	}, [clickedIndex, images]);

	useEffect(() => {
		if (clickedIndex === null || !images) {
			setClickedImage(null);
			return;
		}
		setClickedImage(images[clickedIndex]);
	}, [clickedIndex, images]);

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
				{images.map((image, index) => (
					<ImageContainer image={image} key={image._id} onClick={() => handleClick(index)} ratio="3/4" />
				))}
			</Grid>
			<LightBox
				image={clickedImage}
				nextImage={images.length > 1 ? nextImage : undefined}
				prevImage={images.length > 1 ? prevImage : undefined}
				resetClick={resetClick}
			/>
		</>
	);
}
