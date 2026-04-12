"use client";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { FocusTrap } from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
	nextImageData?: LightboxImage | null;
	prevImageData?: LightboxImage | null;
};

type DisplayedImage = {
	id: string;
	src: string;
	srcSet: string | undefined;
	alt: string;
};

const transition = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as const;
const fadeTransition = { duration: 0.3, ease: "easeInOut" } as const;

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
function preloadImage(url: string) {
	const img = new Image();
	img.src = buildFinalSrc(url);
}

export default function LightBox({
	image,
	nextImage,
	prevImage,
	resetClick,
	prevImageData,
	nextImageData,
}: Readonly<Props>) {
	useEscape(resetClick);

	const [displayed, setDisplayed] = useState<DisplayedImage | null>(null);
	const [previousDisplayed, setPreviousDisplayed] = useState<DisplayedImage | null>(null);
	const [loadingSrc, setLoadingSrc] = useState<string | null>(null);
	const [isRevealed, setIsRevealed] = useState(false);

	const pendingImage = useRef<LightboxImage | null>(null);
	const displayedRef = useRef<DisplayedImage | null>(null);

	useEffect(() => {
		displayedRef.current = displayed;
	}, [displayed]);

	useLeftArrow(() => prevImage?.());
	useRightArrow(() => nextImage?.());

	useEffect(() => {
		if (nextImageData?.url) preloadImage(nextImageData.url);
		if (prevImageData?.url) preloadImage(prevImageData.url);
	}, [nextImageData, prevImageData]);

	useEffect(() => {
		if (!image || !image.url) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setDisplayed(null);
			setPreviousDisplayed(null);
			setLoadingSrc(null);
			setIsRevealed(false);
			pendingImage.current = null;
			return;
		}

		const finalSrc = buildFinalSrc(image.url);
		if (finalSrc === displayedRef.current?.src) return;

		pendingImage.current = image;
		// On fige l'ancienne image comme fond — elle restera visible
		// à opacity:1 jusqu'à ce que la nouvelle soit complètement révélée.
		setPreviousDisplayed(displayedRef.current);
		setIsRevealed(false);
		setLoadingSrc(finalSrc);
	}, [image?._id]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleLoad = useCallback(() => {
		const snap = pendingImage.current;
		if (!snap || !snap.url || !loadingSrc) return;

		const next: DisplayedImage = {
			id: snap._id,
			src: loadingSrc,
			srcSet: buildSrcSet(snap.url),
			alt: "image",
		};

		// flushSync : React peint d'abord l'image à opacity:0 dans le DOM,
		// puis on déclenche le fade-in. Pas de double rAF fragile.
		flushSync(() => {
			setDisplayed(next);
			setLoadingSrc(null);
		});

		setIsRevealed(true);
	}, [loadingSrc]);

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
								className="relative overflow-hidden"
								style={{
									aspectRatio: `${image.width} / ${image.height}`,
									maxHeight: "calc(100dvh - 4rem)",
									maxWidth: "calc(100dvw - 4rem)",
									width: `min(calc(100dvw - 4rem), calc((100dvh - 4rem) * ${image.width} / ${image.height}))`,
									height: "auto",
								}}
							>
								{/* Placeholder : TOUJOURS présent en fond.
								    Il est recouvert par les images au-dessus,
								    donc jamais visible quand une image est affichée — 
								    mais jamais la cause d'un clignotement non plus. */}
								<div className="bg-quaternary absolute inset-0" />

								{/* Ancienne image : toujours à opacity:1, sert de fond stable
								    pendant le chargement et le fade-in de la nouvelle.
								    Disparaît uniquement quand le fade est réellement terminé. */}
								{previousDisplayed && (
									/* eslint-disable-next-line @next/next/no-img-element */
									<img
										key={`prev-${previousDisplayed.id}`}
										alt=""
										aria-hidden="true"
										className="absolute inset-0 h-full w-full object-contain drop-shadow-md"
										decoding="async"
										src={previousDisplayed.src}
										srcSet={previousDisplayed.srcSet}
									/>
								)}

								{/* Nouvelle image : fade-in par-dessus le fond.
								    onAnimationComplete efface previousDisplayed uniquement
								    quand Framer confirme que l'animation est réellement terminée. */}
								{displayed && (
									<motion.img
										key={displayed.id}
										alt={displayed.alt}
										animate={{ opacity: isRevealed ? 1 : 0 }}
										className="absolute inset-0 h-full w-full object-contain drop-shadow-md"
										decoding="async"
										fetchPriority="high"
										initial={{ opacity: 0 }}
										sizes="(max-width: 768px) 100vw, 80vw"
										src={displayed.src}
										srcSet={displayed.srcSet}
										transition={fadeTransition}
										onAnimationComplete={() => {
											if (isRevealed) setPreviousDisplayed(null);
										}}
									/>
								)}

								{/* Fantôme de préchargement — invisible, déclenche handleLoad */}
								{loadingSrc && (
									/* eslint-disable-next-line @next/next/no-img-element */
									<img
										key={`loading-${loadingSrc}`}
										alt=""
										aria-hidden="true"
										className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
										decoding="async"
										src={loadingSrc}
										onLoad={handleLoad}
									/>
								)}
							</div>
						</motion.div>
					</motion.div>
				</FocusTrap>
			)}
		</AnimatePresence>
	);
}
