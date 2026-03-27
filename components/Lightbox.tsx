"use client";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { FocusTrap } from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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

// Transition partagée pour éviter la duplication
const transition = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as const;

export default function LightBox({ image, nextImage, prevImage, resetClick }: Readonly<Props>) {
	const [isLoaded, setIsLoaded] = useState(false);

	const imgRef = useRef<HTMLImageElement>(null);

	const isVisible = !!image;

	const handleClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			resetClick();
		},
		[resetClick],
	);

	const handleClose = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			resetClick();
		},
		[resetClick],
	);

	const handleNextClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			nextImage?.();
		},
		[nextImage],
	);

	const handlePrevClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			prevImage?.();
		},
		[prevImage],
	);

	useEscape(resetClick);
	useLeftArrow(() => prevImage?.());
	useRightArrow(() => nextImage?.());

	useEffect(() => {
		setIsLoaded(false);
		if (imgRef.current?.complete) {
			setIsLoaded(true);
		}
	}, [image?._id]);

	useEffect(() => {
		if (!isVisible) return;
		const prev = document.documentElement.style.overflow;
		document.documentElement.style.overflow = "hidden";
		return () => {
			document.documentElement.style.overflow = prev;
		};
	}, [isVisible]);

	return (
		<AnimatePresence>
			{isVisible && (
				<FocusTrap
					active={isVisible}
					focusTrapOptions={{
						escapeDeactivates: false,
						returnFocusOnDeactivate: true,
						allowOutsideClick: true,
						// Évite l'erreur si le premier tabbable n'est pas encore rendu
						fallbackFocus: () => document.body,
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
						<LightBoxButton className="top-5 right-5" icon={IconX} onClick={handleClose} />

						{!!nextImage && (
							<LightBoxButton
								className="top-1/2 right-5 -translate-y-1/2"
								icon={IconChevronRight}
								onClick={handleNextClick}
							/>
						)}
						{!!prevImage && (
							<LightBoxButton
								className="top-1/2 left-5 -translate-y-1/2"
								icon={IconChevronLeft}
								onClick={handlePrevClick}
							/>
						)}

						{/* Image + placeholder */}
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
									height: "auto",
									maxWidth: "calc(100dvw - 4rem)",
									maxHeight: "calc(100dvh - 4rem)",
									width: `min(calc(100dvw - 4rem), calc((100dvh - 4rem) * ${image.width} / ${image.height}))`,
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

								<Image
									alt={image.alt || "image"}
									className="object-contain drop-shadow-md"
									fill
									key={image._id}
									onLoad={() => setIsLoaded(true)}
									ref={imgRef}
									src={image.url}
								/>
							</div>
						</motion.div>
					</motion.div>
				</FocusTrap>
			)}
		</AnimatePresence>
	);
}
