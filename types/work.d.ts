import { SanityImage } from "./sanityImage";

export interface Work {
	_id: string;
	gallery?: SanityImage[];
	slug: string;
	text?: string;
	title: string;
	mainImage?: SanityImage;
}
