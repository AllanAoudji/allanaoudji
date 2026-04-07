"use client";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { FocusTrap } from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import useEscape from "@/lib/hooks/useEscape";
import useLeftArrow from "@/lib/hooks/useLeftArrow";
import useRightArrow from "@/lib/hooks/useRightArrow";
import LightBoxButton from "./LightboxButton";
import LightboxImage from "@/types/lightboxImage";

type Props = {
	image: LightboxImage | null;
	nextImage?: () => void;
	prevImage?: () => void;
	resetClick: () => void;
};

const transition = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as const;

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

function buildSrcSet(url: string) {
	if (isSanity(url)) return widths.map(w => `${buildSanityUrl(url, w)} ${w}w`).join(", ");
	if (isShopify(url)) return widths.map(w => `${buildShopifyUrl(url, w)} ${w}w`).join(", ");
	return undefined;
}

function buildFinalSrc(url: string) {
	if (isSanity(url)) return buildSanityUrl(url, 1200);
	if (isShopify(url)) return buildShopifyUrl(url, 1200);
	return url;
}

export default function LightBox({ image, nextImage, prevImage, resetClick }: Readonly<Props>) {
	useEscape(resetClick);
	useLeftArrow(() => prevImage?.());
	useRightArrow(() => nextImage?.());

	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	const handleClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			resetClick();
		},
		[resetClick],
	);
	const handleClose = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			resetClick();
		},
		[resetClick],
	);
	const handleNextClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			nextImage?.();
		},
		[nextImage],
	);
	const handlePrevClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			prevImage?.();
		},
		[prevImage],
	);

	useEffect(() => {
		setIsLoaded(false);
		if (imgRef.current?.complete) setIsLoaded(true);
	}, [image?._id]);

	return (
		<AnimatePresence>
			{!!image && (
				<FocusTrap
					active
					focusTrapOptions={{
						allowOutsideClick: true,
						escapeDeactivates: false,
						fallbackFocus: () => document.body,
						returnFocusOnDeactivate: true,
						setReturnFocus: el => {
							if (el instanceof HTMLElement) el.focus({ preventScroll: true });
							return false;
						},
					}}
				>
					<motion.div
						animate={{ opacity: 1 }}
						aria-label="Image en plein écran"
						aria-modal="true"
						className="bg-tertiary/25 fixed inset-0 z-40 overscroll-contain p-8 backdrop-blur-md"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						key="lightbox"
						onClick={handleClick}
						role="dialog"
						transition={transition}
					>
						<LightBoxButton
							aria-label="Fermer"
							className="top-5 right-5"
							icon={IconX}
							onClick={handleClose}
						/>
						{!!nextImage && (
							<LightBoxButton
								aria-label="Image suivante"
								className="top-1/2 right-5 -translate-y-1/2"
								icon={IconChevronRight}
								onClick={handleNextClick}
							/>
						)}
						{!!prevImage && (
							<LightBoxButton
								aria-label="Image précédente"
								className="top-1/2 left-5 -translate-y-1/2"
								icon={IconChevronLeft}
								onClick={handlePrevClick}
							/>
						)}

						<motion.div
							animate={{ opacity: 1, y: 0, scale: 1 }}
							className="flex h-full w-full items-center justify-center"
							exit={{ opacity: 0, y: 8, scale: 0.98 }}
							initial={{ opacity: 0, y: 16, scale: 0.97 }}
							transition={transition}
						>
							<div
								className="relative"
								style={{
									aspectRatio: `${image.width} / ${image.height}`,
									maxHeight: "calc(100dvh - 4rem)",
									maxWidth: "calc(100dvw - 4rem)",
									width: `min(calc(100dvw - 4rem), calc((100dvh - 4rem) * ${image.width} / ${image.height}))`,
									height: "auto",
								}}
							>
								<AnimatePresence>
									{!isLoaded && (
										<motion.div
											className="bg-quaternary absolute inset-0"
											exit={{ opacity: 0 }}
											initial={{ opacity: 1 }}
											key="placeholder"
											transition={{ duration: 0.3 }}
										/>
									)}
								</AnimatePresence>

								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									ref={imgRef}
									key={image._id}
									alt={image.alt || "image"}
									className="absolute inset-0 h-full w-full object-contain drop-shadow-md"
									decoding="async"
									fetchPriority="high"
									loading="eager"
									onLoad={() => setIsLoaded(true)}
									sizes="(max-width: 768px) 100vw, 80vw"
									src={buildFinalSrc(image.url)}
									srcSet={buildSrcSet(image.url)}
								/>
							</div>
						</motion.div>
					</motion.div>
				</FocusTrap>
			)}
		</AnimatePresence>
	);
}
