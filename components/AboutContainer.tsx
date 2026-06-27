"use client";

import { createImageUrlBuilder } from "@sanity/image-url";
import { FigureImage } from "./FigureImage";
import PortableTextContent from "./PortableTextContent";
import { dataset, projectId } from "@/studio/env.public";
import { AboutImage, AboutText } from "@/types/sanityType";

type Props = {
	images: AboutImage[] | null;
	text: AboutText[];
};

const builder = createImageUrlBuilder({ projectId, dataset });

export default function AboutContainer({ images, text }: Readonly<Props>) {
	return (
		<div className="grid gap-16 lg:grid-cols-5">
			{!!images && (
				<div className="col-span-2 flex w-full flex-col gap-4">
					{images?.map(image => {
						const w = image.width ?? 900;
						const h = image.height ?? 1100;
						const src = builder.image(image).width(800).auto("format").url();

						return (
							<div
								key={image._key}
								className="bg-quaternary relative w-full"
								style={{ aspectRatio: `${w}/${h}` }}
							>
								<FigureImage alt={image.alt ?? ""} lqip={image.lqip} src={src} srcSet={src} />
							</div>
						);
					})}
				</div>
			)}
			<div className="col-span-3">
				<PortableTextContent value={text} variant="feature" />
			</div>
		</div>
	);
}
