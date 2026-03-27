"use client";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
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

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function LightBox({ image, nextImage, prevImage, resetClick }: Readonly<Props>) {
	const [isLoaded, setIsLoaded] = useState(false);
	const isVisible = !!image && !!image.height && !!image.width && !!image.url;

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		resetClick();
	};
	const handleNextClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		nextImage?.();
	};
	const handlePrevClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		prevImage?.();
	};

	useEscape(resetClick);
	useLeftArrow(() => prevImage?.());
	useRightArrow(() => nextImage?.());

	useEffect(() => {
		document.documentElement.style.overflow = isVisible ? "hidden" : "";
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [isVisible]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					key="lightbox"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease }}
					className="bg-tertiary/25 fixed inset-0 z-40 overscroll-contain p-8 backdrop-blur-md"
					onClick={handleClick}
				>
					{/* Boutons */}
					<LightBoxButton className="top-5 right-5" icon={IconX} />
					{!!nextImage && (
						<LightBoxButton
							onClick={handleNextClick}
							className="top-1/2 right-5 -translate-y-1/2"
							icon={IconChevronRight}
						/>
					)}
					{!!prevImage && (
						<LightBoxButton
							onClick={handlePrevClick}
							className="top-1/2 left-5 -translate-y-1/2"
							icon={IconChevronLeft}
						/>
					)}

					{/* Image + placeholder */}
					<motion.div
						className="flex h-full w-full items-center justify-center"
						initial={{ opacity: 0, y: 16, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.98 }}
						transition={{ duration: 0.4, ease }}
					>
						<div
							className="relative"
							style={{
								aspectRatio: `${image.width} / ${image.height}`,
								maxWidth: "100%",
								maxHeight: "100%",
								width: "100%",
								height: "100%",
							}}
						>
							<AnimatePresence>
								{!isLoaded && (
									<motion.div
										key="placeholder"
										className="bg-quaternary/80 absolute inset-0"
										initial={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</AnimatePresence>

							<Image
								key={image._id}
								alt={image.alt || "image"}
								src={image.url}
								fill
								className="object-contain drop-shadow-md"
								onLoad={() => setIsLoaded(true)}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
