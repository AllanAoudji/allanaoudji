import { CONTACTS_QUERY_RESULT, WORKS_QUERY_RESULT } from "@/studio/types";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type contacts = NonNullable<NonNullable<CONTACTS_QUERY_RESULT>["contacts"]>;
export type contact = Unpacked<contacts>;

export type works = NonNullable<NonNullable<WORKS_QUERY_RESULT>["works"]>;
export type work = Unpacked<works>;
export type workGallery = NonNullable<work["gallery"]>;
export type workGalleryImage = Unpacked<workGallery>;
export type workMainImage = work["mainImage"];
