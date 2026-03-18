"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import shopifyImage from "@/types/shopifyImage";

type ImageSliderProps = {
	className?: string;
	images: shopifyImage[];
};

export default function ImageSlider({ className, images }: ImageSliderProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	// Keep --slide-w in sync with the container's rendered width so that each
	// slide is always exactly as wide as the visible viewport of the scroller,
	// regardless of the image's native aspect-ratio.
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const sync = () => el.style.setProperty("--slide-w", `${el.clientWidth}px`);

		sync();
		const ro = new ResizeObserver(sync);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	if (!images.length) return null;

	return (
		<div
			ref={scrollRef}
			className={cn(
				"relative aspect-3/4 w-full",
				{
					"overflow-x-auto overflow-y-hidden scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-x-hidden lg:overflow-y-auto [&::-webkit-scrollbar]:hidden":
						images.length > 1,
				},
				className,
			)}
		>
			{/* Inner track — horizontal on mobile, vertical on lg+ */}
			<div className="flex h-full w-max flex-row lg:h-auto lg:w-full lg:flex-col">
				{images.map(image => (
					/*
					 * Mobile (< lg) : the slide must be exactly as wide as the scroll
					 * container's viewport. We can't use w-full here because the flex
					 * parent is w-max (wider than the viewport).
					 * Fix: use 100cqw (container query width) via an inline style that
					 * falls back to 100svw. The overflow container itself has a fixed
					 * 3/4 aspect-ratio, so its height drives its width → each slide
					 * must match that width exactly.
					 *
					 * Desktop (≥ lg) : the flex direction flips to column, the container
					 * is w-full and h-auto, so w-full + aspect-ratio on the slide works
					 * normally.
					 */
					<div
						key={image.id}
						className="relative aspect-3/4 shrink-0 lg:w-full"
						style={{
							// Mobile: width = container's own rendered width (not the track's w-max)
							// We read it via the scroll container ref; before mount CSS handles it.
							width: "var(--slide-w, 100%)",
						}}
					>
						<Image
							src={image.url}
							alt={image.altText ?? ""}
							fill
							className="object-cover select-none"
							draggable={false}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
