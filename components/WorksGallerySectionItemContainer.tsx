"use client";

import { useEffect } from "react";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import WorksGallerySectionItem from "./WorksGallerySectionItem";
import { works } from "@/types/sanityType";

type Props = {
	works: works;
};

const getLightBoxImages = (works: works) => {
	if (!works) {
		return [];
	}
	const images = works.flatMap(work => work.gallery || []);
	return images;
};

export default function WorksGallerySectionItemContainer({ works }: Readonly<Props>) {
	const { updateImages, resetImages } = useLightBox();

	useEffect(() => {
		updateImages(getLightBoxImages(works));
		return () => {
			resetImages();
		};
	}, [resetImages, updateImages, works]);

	return works.map((work, i) => (
		<WorksGallerySectionItem key={work._id} separator={works.length - 1 !== i} work={work} />
	));
}
