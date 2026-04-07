"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import { useProduct } from "@/lib/contexts/product-context";
import { buildGalleryImages, cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductSingleGallery({ className, product }: Readonly<Props>) {
	const { variants } = product;

	const { setImage, resetImages, updateImages } = useLightBox();
	const { state } = useProduct();

	const [activeIndex, setActiveIndex] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);

	const touchStartX = useRef<number>(0);
	const dragX = useRef<number>(0);

	const variant = useMemo(() => {
		return variants.find(variant =>
			variant.selectedOptions.every(option => option.value === state[option.name.toLowerCase()]),
		);
	}, [state, variants]);

	const images = useMemo(() => {
		return buildGalleryImages(product, variant);
	}, [product, variant]);

	const handleClick = useCallback(
		(id: string) => {
			setImage(id);
		},
		[setImage],
	);

	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		const startX = e.touches[0].clientX;
		if (startX < 20) return;
		touchStartX.current = startX;
		setDragging(true);
		setDragOffset(0);
	}, []);

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		const delta = e.touches[0].clientX - touchStartX.current;
		dragX.current = delta;
		setDragOffset(delta);
	}, []);

	const handleTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			setDragging(false);
			setDragOffset(0);
			const delta = dragX.current;
			dragX.current = 0;
			if (Math.abs(delta) < 50) return;
			e.preventDefault();
			if (delta < 0) {
				setActiveIndex(i => Math.min(i + 1, images.length - 1));
			} else {
				setActiveIndex(i => Math.max(i - 1, 0));
			}
		},
		[images.length],
	);

	useEffect(() => {
		setActiveIndex(0);
	}, [variant?.id]);

	useEffect(() => () => setActiveIndex(0), []);

	useEffect(() => {
		updateImages(images || []);
	}, [updateImages, images]);

	useEffect(() => {
		return () => resetImages();
	}, [resetImages]);

	if (!images.length) return null;

	return (
		<div className={className}>
			{/* 📱 MOBILE : image principale fixe */}
			<div className="lg:hidden">
				<div className="relative aspect-3/4 w-full overflow-hidden">
					<div
						style={{
							transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
							transition: dragging ? "none" : "transform 300ms ease-in-out",
						}}
						className="flex"
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						{images.map(image => (
							<div key={image.id} className="w-full shrink-0">
								<ImageContainer
									className="cursor-pointer"
									image={image}
									onClick={() => handleClick(image.id)}
									ratio="3/4"
									sizes="(max-width: 1024px) 100vw, 50vw"
								/>
							</div>
						))}
					</div>
				</div>

				{/* 🔽 Thumbnails */}
				{images.length > 1 && (
					<div className="mt-2 grid grid-cols-4 gap-2">
						{images.map((image, index) => (
							<button
								aria-label="Voir l'image en grand"
								className={cn("transition", {
									"cursor-pointer opacity-30": activeIndex !== index,
								})}
								key={image.id}
								onClick={() => setActiveIndex(index)}
							>
								<ImageContainer image={image} ratio="4/3" sizes="(max-width: 1024px) 25vw, 12vw" />
							</button>
						))}
					</div>
				)}
			</div>

			{/* 💻 DESKTOP GRID */}
			<div className="hidden grid-cols-2 gap-2 lg:grid">
				{images.map(image => (
					<ImageContainer
						className="cursor-pointer"
						image={image}
						key={image.url}
						onClick={() => handleClick(image.id)}
						ratio="3/4"
						sizes="(max-width: 1024px) 100vw, 50vw"
					/>
				))}
			</div>
		</div>
	);
}
