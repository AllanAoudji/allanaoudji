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
	const { appendImages, resetImages } = useLightBox();

	useEffect(() => {
		appendImages(work.gallery || []);
	}, [appendImages, work.gallery]);

	useEffect(() => {
		return () => resetImages();
	}, [resetImages]);

	return (
		<section>
			<WorkText text={work.text} />
			<WorkImages images={work.gallery} />
		</section>
	);
}
