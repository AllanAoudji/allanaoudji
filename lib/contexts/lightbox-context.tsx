"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import LightBox from "@/components/Lightbox";
import { workGalleryImage } from "@/types/sanityType";

type Props = {
	children: React.ReactNode;
};
type LightBoxContectType = {
	images: null | workGalleryImage[];
	updateImages: (_images: workGalleryImage[]) => void;
	resetImages: () => void;
	setImage: (_id: string) => void;
};

const LightboxContext = createContext<LightBoxContectType | undefined>(undefined);

export function LightboxProvider({ children }: Readonly<Props>) {
	const [images, setImages] = useState<workGalleryImage[] | null>(null);
	const [clickedImage, setClickedImage] = useState<workGalleryImage | null>(null);
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);

	const resetClick = useCallback(() => {
		setClickedImage(null);
		setClickedIndex(null);
	}, []);

	const setImage = useCallback(
		(id: string) => {
			const image = images?.find(img => img._id === id) || null;
			setClickedImage(image);
		},
		[images, setClickedImage],
	);

	const nextImage = useCallback(() => {
		if (!images || clickedIndex === null) return;
		setClickedIndex(prev => (prev !== null ? (prev + 1) % images.length : null));
	}, [clickedIndex, images]);

	const prevImage = useCallback(() => {
		if (!images || clickedIndex === null) return;
		setClickedIndex(prev => (prev !== null ? (prev - 1 + images.length) % images.length : null));
	}, [clickedIndex, images]);

	const updateImages = useCallback((images: workGalleryImage[]) => {
		setImages(images);
	}, []);

	const resetImages = useCallback(() => {
		setImages(null);
	}, []);

	const value = useMemo(
		() => ({ images, updateImages, resetImages, setImage }),
		[images, setImage, resetImages, updateImages],
	);

	useEffect(() => {
		if (clickedImage === null || images === null) {
			setClickedIndex(null);
			return;
		}
		setClickedIndex(images.findIndex(img => img._id === clickedImage._id));
	}, [clickedImage, images]);

	useEffect(() => {
		if (clickedIndex === null || images === null) {
			setClickedImage(null);
			return;
		}
		setClickedImage(images[clickedIndex]);
	}, [clickedIndex, images]);

	return (
		<LightboxContext.Provider value={value}>
			<LightBox
				image={clickedImage}
				nextImage={!!images && images.length > 1 ? nextImage : undefined}
				prevImage={!!images && images.length > 1 ? prevImage : undefined}
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
