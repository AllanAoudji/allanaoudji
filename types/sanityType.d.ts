import { CONTACTS_QUERY_RESULT, WORKS_QUERY_RESULT } from "@/studio/types";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type Contacts = NonNullable<NonNullable<CONTACTS_QUERY_RESULT>>;
export type Contact = Unpacked<Contacts>;

export type Works = NonNullable<NonNullable<WORKS_QUERY_RESULT>["works"]>;
export type Work = Unpacked<Works>;
export type WorkGallery = NonNullable<Work["gallery"]>;
export type WorkGalleryImage = Unpacked<WorkGallery>;
export type WorkMainImage = Work["mainImage"];

type SanityImage = {
	_id: string;
	alt: string | null;
	blurHash: string | null;
	height: number | null;
	lqip: string | null;
	url: string | null;
	width: number | null;
};
