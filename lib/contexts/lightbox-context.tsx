"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import LightBox from "@/components/Lightbox";
import LightboxImage from "@/types/lightboxImage";
import { workGalleryImage } from "@/types/sanityType";
import shopifyImage from "@/types/shopifyImage";

// types/lightboxImage.ts

function normalizeSanityImage(img: workGalleryImage): LightboxImage {
	return img as LightboxImage; // _id already exists
}

export function normalizeShopifyImage(img: shopifyImage): LightboxImage {
	return { ...img, _id: img.id, alt: img.altText ?? null };
}

type Props = {
	children: React.ReactNode;
};

type LightBoxContextType = {
	appendImages: (_newImages: workGalleryImage[] | shopifyImage[]) => void;
	resetImages: () => void;
	setImage: (_id: string) => void;
	updateImages: (_newImages: workGalleryImage[] | shopifyImage[]) => void;
};

const LightboxContext = createContext<LightBoxContextType | undefined>(undefined);

export function LightboxProvider({ children }: Readonly<Props>) {
	const [clickedImage, setClickedImage] = useState<LightboxImage | null>(null);
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);
	const [images, setImages] = useState<LightboxImage[] | null>(null);

	const resetClick = useCallback(() => {
		setClickedImage(null);
		setClickedIndex(null);
	}, []);

	const setImage = useCallback(
		(id: string) => {
			const image = images?.find(img => img._id === id) ?? null;
			setClickedImage(image);
		},
		[images],
	);

	const appendImages = useCallback((newImages: workGalleryImage[] | shopifyImage[]) => {
		const normalized: LightboxImage[] = newImages.map(img =>
			"_id" in img ? normalizeSanityImage(img) : normalizeShopifyImage(img),
		);
		setImages(prev => (prev ? [...prev, ...normalized] : normalized));
	}, []);

	const updateImages = useCallback((newImages: workGalleryImage[] | shopifyImage[]) => {
		const normalized: LightboxImage[] = newImages.map(img =>
			"_id" in img ? normalizeSanityImage(img) : normalizeShopifyImage(img),
		);
		setImages(normalized);
	}, []);

	const nextImage = useCallback(() => {
		if (!images || clickedIndex === null) return;
		setClickedIndex(prev => (prev !== null ? (prev + 1) % images.length : null));
	}, [clickedIndex, images]);

	const prevImage = useCallback(() => {
		if (!images || clickedIndex === null) return;
		setClickedIndex(prev => (prev !== null ? (prev - 1 + images.length) % images.length : null));
	}, [clickedIndex, images]);

	const resetImages = useCallback(() => {
		setImages(null);
	}, []);

	// Sync index → image (navigation par flèches)
	useEffect(() => {
		if (clickedIndex === null || images === null) return;
		setClickedImage(images[clickedIndex]);
	}, [clickedIndex]); // eslint-disable-line react-hooks/exhaustive-deps

	// Sync image → index (ouverture par clic)
	useEffect(() => {
		if (clickedImage === null || images === null) {
			setClickedIndex(null);
			return;
		}
		const idx = images.findIndex(img => img._id === clickedImage._id);
		setClickedIndex(idx === -1 ? null : idx);
	}, [clickedImage]); // eslint-disable-line react-hooks/exhaustive-deps

	const value = useMemo(
		() => ({ appendImages, resetImages, setImage, updateImages }),
		[appendImages, resetImages, setImage, updateImages],
	);

	return (
		<LightboxContext.Provider value={value}>
			<LightBox
				image={clickedImage}
				nextImage={images && images.length > 1 ? nextImage : undefined}
				prevImage={images && images.length > 1 ? prevImage : undefined}
				resetClick={resetClick}
			/>
			{children}
		</LightboxContext.Provider>
	);
}

export function useLightBox() {
	const context = useContext(LightboxContext);
	if (context === undefined) {
		throw new Error("useLightBox must be used within a LightboxProvider");
	}
	return context;
}
