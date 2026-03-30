"use client";

import { useCallback, useEffect } from "react";
import { useLightBox } from "@/lib/contexts/lightbox-context";
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
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{images.map(image => (
					<ImageContainer
						image={image}
						key={image._id}
						onClick={() => handleClick(image._id)}
						ratio="3/4"
						className="cursor-pointer transition-transform duration-500 hover:scale-[103%]"
					/>
				))}
			</div>
		</>
	);
}
