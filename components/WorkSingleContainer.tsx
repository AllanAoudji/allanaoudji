"use client";

import { useEffect } from "react";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import WorkImages from "./WorkImages";
import WorkText from "./WorkText";
import { work } from "@/types/sanityType";

type Props = {
	work: work;
};

export default function WorkSingleContainer({ work }: Readonly<Props>) {
	const { updateImages, resetImages } = useLightBox();

	useEffect(() => {
		updateImages(work.gallery || []);
		return () => {
			resetImages();
		};
	}, [resetImages, updateImages, work.gallery]);

	return (
		<section>
			<WorkText text={work.text} />
			<WorkImages images={work.gallery} />
		</section>
	);
}
