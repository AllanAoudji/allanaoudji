"use client";

import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { WorkGalleryImage, WorkMainImage } from "@/types/sanityType";
import shopifyImage from "@/types/shopifyImage";

type AspectRatio = "4/3" | "3/4" | "4/5" | "1/1";

type Props = {
	className?: string;
	image: WorkGalleryImage | shopifyImage | WorkMainImage;
	priority?: boolean;
	sizes?: string;
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

const widths = [320, 480, 640, 768, 960, 1200];

function isSanity(url: string) {
	return url.includes("cdn.sanity.io");
}
function isShopify(url: string) {
	return url.includes("cdn.shopify.com");
}

function buildSanityUrl(url: string, width: number) {
	return `${url}?w=${width}&auto=format&fit=max`;
}

function buildShopifyUrl(url: string, width: number) {
	const sep = url.includes("?") ? "&" : "?";
	return `${url}${sep}width=${width}`;
}

export default function ImageContainer({
	className,
	image,
	onClick,
	priority = false,
	sizes = "(max-width: 768px) 100vw, 50vw",
	ratio,
}: Readonly<Props>) {
	const [loaded, setLoaded] = useState(false);

	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imgRef.current?.complete) {
			setLoaded(true);
		}
	}, []);

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

	const src = normalized.url;
	let srcSet: string | undefined;
	let finalSrc = src;

	if (isSanity(src)) {
		srcSet = widths.map(w => `${buildSanityUrl(src, w)} ${w}w`).join(", ");
		finalSrc = buildSanityUrl(src, 768);
	} else if (isShopify(src)) {
		srcSet = widths.map(w => `${buildShopifyUrl(src, w)} ${w}w`).join(", ");
		finalSrc = buildShopifyUrl(src, 768);
	}

	const content = (
		<div className="overflow-hidden">
			<div className={cn("bg-quaternary relative w-full", getAspectRatioClass(ratio), className)}>
				{/* Blur placeholder */}
				{normalized.blur && (
					<div
						className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
						style={{
							backgroundImage: `url(${normalized.blur})`,
							opacity: loaded ? 0 : 1,
						}}
					/>
				)}

				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					alt={normalized.alt ?? "image"}
					className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
					decoding="async"
					fetchPriority={priority ? "high" : "low"}
					loading={priority ? "eager" : "lazy"}
					sizes={sizes}
					src={finalSrc}
					srcSet={srcSet}
					style={{ opacity: loaded ? 1 : 0 }}
					ref={imgRef}
					onLoad={() => setLoaded(true)}
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
