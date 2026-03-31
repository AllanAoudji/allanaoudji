"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
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
						className="flex transition-transform duration-300 ease-in-out"
						style={{ transform: `translateX(-${activeIndex * 100}%)` }}
					>
						{images.map(image => (
							<div key={image.id} className="w-full shrink-0">
								<ImageContainer
									className="cursor-pointer"
									image={image}
									onClick={() => handleClick(image.id)}
									ratio="3/4"
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
								<ImageContainer image={image} ratio="4/3" />
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
					/>
				))}
			</div>
		</div>
	);
}
