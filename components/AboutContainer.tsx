"use client";

import ImageContainer from "./ImageContainer";
import PortableTextContent from "./PortableTextContent";
import { PortableText } from "@/studio/types";
import { SanityImage } from "@/types/sanityType";

type Props = {
	images: SanityImage[] | null;
	text: PortableText;
};

export default function AboutContainer({ images, text }: Readonly<Props>) {
	return (
		<div className="grid gap-8 lg:grid-cols-5 lg:gap-16">
			{!!images && (
				<div className="col-span-2 flex w-full flex-col gap-4">
					{images?.map(image => {
						return <ImageContainer key={image._id} image={image} ratio="4/3" />;
					})}
				</div>
			)}
			<div className="lg:col-span-3">
				<PortableTextContent value={text} variant="feature" />
			</div>
		</div>
	);
}
