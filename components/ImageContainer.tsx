"use client";

import Image from "next/image";
import { MouseEventHandler, useMemo } from "react";
import { cn } from "@/lib/utils";
import { workGalleryImage, workMainImage } from "@/types/sanityType";
import shopifyImage from "@/types/shopifyImage";

type AspectRatio = "4/3" | "3/4" | "4/5" | "1/1";

type Props = {
	image: workGalleryImage | shopifyImage | workMainImage;
	priority?: boolean;
	ratio: AspectRatio;
	className?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const getAspectRatioClass = (ratio: AspectRatio) => {
	switch (ratio) {
		case "3/4":
			return "aspect-[3/4]";
		case "4/3":
			return "aspect-[4/3]";
		case "4/5":
			return "aspect-[4/5]";
		case "1/1":
			return "aspect-square";
		default:
			return "aspect-[3/4]";
	}
};

export default function ImageContainer({
	image,
	priority = false,
	ratio,
	className,
	onClick,
}: Readonly<Props>) {
	const normalized = useMemo(() => {
		if (!image) return null;

		return {
			url: "url" in image ? image.url : null,
			alt: "alt" in image ? image.alt : "altText" in image ? image.altText : null,
			blur: "lqip" in image ? image.lqip : null,
		};
	}, [image]);

	if (!normalized?.url) {
		return <div className={cn(getAspectRatioClass(ratio), "bg-tertiary w-full")} />;
	}

	const content = (
		<div className="overflow-hidden">
			<div className={cn("bg-quaternary relative w-full", getAspectRatioClass(ratio), className)}>
				<Image
					src={normalized.url}
					alt={normalized.alt ?? "image"}
					fill
					priority={priority}
					placeholder={normalized.blur ? "blur" : "empty"}
					blurDataURL={normalized.blur ?? undefined}
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
		</div>
	);

	if (onClick) {
		return (
			<button
				type="button"
				onClick={onClick}
				className="block w-full cursor-pointer"
				aria-label={normalized.alt ?? "Voir l'image"}
			>
				{content}
			</button>
		);
	}

	return content;
}
