"use client";

import Image from "next/image";
import { MouseEventHandler, useMemo } from "react";
import { cn } from "@/lib/utils";
import { WorkGalleryImage, WorkMainImage } from "@/types/sanityType";
import shopifyImage from "@/types/shopifyImage";

type AspectRatio = "4/3" | "3/4" | "4/5" | "1/1";

type Props = {
	className?: string;
	image: WorkGalleryImage | shopifyImage | WorkMainImage;
	priority?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	ratio: AspectRatio;
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
	className,
	image,
	onClick,
	priority = false,
	ratio,
}: Readonly<Props>) {
	const normalized = useMemo(() => {
		if (!image) return null;

		return {
			alt: "alt" in image ? image.alt : "altText" in image ? image.altText : null,
			blur: "lqip" in image ? image.lqip : null,
			url: "url" in image ? image.url : null,
		};
	}, [image]);

	if (!normalized?.url) {
		return <div className={cn(getAspectRatioClass(ratio), "bg-tertiary w-full")} />;
	}

	const content = (
		<div className="overflow-hidden">
			<div className={cn("bg-quaternary relative w-full", getAspectRatioClass(ratio), className)}>
				<Image
					alt={normalized.alt ?? "image"}
					blurDataURL={normalized.blur ?? undefined}
					className="object-cover"
					fill
					placeholder={normalized.blur ? "blur" : "empty"}
					priority={priority}
					sizes="(max-width: 768px) 100vw, 50vw"
					src={normalized.url}
				/>
			</div>
		</div>
	);

	if (onClick) {
		return (
			<button
				aria-label={normalized.alt ?? "Voir l'image"}
				className="block w-full cursor-pointer"
				onClick={onClick}
				type="button"
			>
				{content}
			</button>
		);
	}

	return content;
}
