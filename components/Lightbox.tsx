"use client";

import Image from "next/image";
import { MouseEvent, useEffect } from "react";
import { workGalleryImage } from "@/types/sanityType";

type Props = {
	image: workGalleryImage | null;
	nextImage?: () => void;
	prevImage?: () => void;
	resetClick: () => void;
};

export default function LightBox({ image, nextImage, prevImage, resetClick }: Readonly<Props>) {
	const handleClick = (e: MouseEvent<HTMLInputElement>) => {
		e.stopPropagation();
		resetClick();
	};
	const hancleNextClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (nextImage) nextImage();
	};
	const handlePrevClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (prevImage) prevImage();
	};

	useEffect(() => {
		if (!image || !image.height || !image.width || !image.url) {
			document.documentElement.style.overflow = "";
		} else {
			document.documentElement.style.overflow = "hidden";
		}
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [image]);

	if (!image || !image.height || !image.width || !image.url) {
		return null;
	}

	return (
		<div
			className="bg-secondary/25 fixed inset-0 z-40 overscroll-contain p-8 backdrop-blur-md"
			onClick={handleClick}
		>
			{!!nextImage && (
				<div onClick={hancleNextClick} className="absolute right-0 z-50 h-10 w-10 bg-red-400">
					next
				</div>
			)}
			{!!prevImage && (
				<div onClick={handlePrevClick} className="absolute left-0 z-50 h-10 w-10 bg-red-400">
					prev
				</div>
			)}
			<div id="link" className="relative h-full w-full overflow-hidden">
				<Image
					alt={image.alt || "image"}
					src={image.url}
					fill={true}
					className="drop-shadow-md"
					objectFit="contain"
				/>
			</div>
		</div>
	);
}
