"use client";

import { useCallback, useEffect } from "react";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import ImageContainer from "./ImageContainer";
import { WorkGallery } from "@/types/sanityType";

type Props = {
	images: WorkGallery | null;
	isFirst?: boolean;
	standalone?: boolean;
};

export default function GalleryImages({ images, isFirst, standalone = false }: Readonly<Props>) {
	const { setImage, resetImages, appendImages } = useLightBox();

	const handleClick = useCallback(
		(id: string) => {
			setImage(id);
		},
		[setImage],
	);

	useEffect(() => {
		if (!standalone) return;
		appendImages(images || []);
	}, [appendImages, images, standalone]);

	useEffect(() => {
		if (!standalone) return;
		return () => resetImages();
	}, [resetImages, standalone]);

	if (
		!images ||
		!images.length ||
		!images.filter(image => !!image.height && !!image.width && !!image.url).length
	) {
		return null;
	}

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{images.map((image, index) => (
				<ImageContainer
					className="cursor-pointer transition-transform duration-500 hover:scale-[103%]"
					image={image}
					key={image._id}
					onClick={() => handleClick(image._id)}
					priority={isFirst && index < 4}
					sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
					ratio="3/4"
				/>
			))}
		</div>
	);
}
