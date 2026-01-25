"use client";

import Image from "next/image";
import { MouseEvent, useEffect } from "react";
import useEscape from "@/lib/hooks/useEscape";
import LightBoxButton from "./LightboxButton";
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

	useEscape(() => {
		resetClick();
	});

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
			<LightBoxButton className="right-5" text="X" />
			{!!nextImage && (
				<LightBoxButton
					onClick={hancleNextClick}
					className="top-1/2 right-5 -translate-y-1/2"
					text=">"
				/>
			)}
			{!!prevImage && (
				<LightBoxButton
					onClick={handlePrevClick}
					className="top-1/2 left-5 -translate-y-1/2"
					text="<"
				/>
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
