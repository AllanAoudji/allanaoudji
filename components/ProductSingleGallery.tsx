"use client";

import { useMemo, useState, useEffect } from "react";
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

	useEffect(() => {
		setActiveIndex(0);
	}, [variant?.id]);

	useEffect(() => () => setActiveIndex(0), []);

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
								<ImageContainer image={image} ratio="3/4" />
							</div>
						))}
					</div>
				</div>

				{/* 🔽 Thumbnails */}
				{images.length > 1 && (
					<div className="mt-2 grid grid-cols-4 gap-2">
						{images.map((image, index) => (
							<button
								key={image.id}
								onClick={() => setActiveIndex(index)}
								className={cn("transition", {
									"cursor-pointer opacity-30": activeIndex !== index,
								})}
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
					<ImageContainer key={image.url} image={image} ratio="3/4" />
				))}
			</div>
		</div>
	);
}
