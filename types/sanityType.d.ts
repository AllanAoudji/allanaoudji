import { CONTACTS_QUERYResult, WORKS_QUERYResult } from "@/sanity/types";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type contacts = NonNullable<NonNullable<CONTACTS_QUERYResult>["contacts"]>;
export type contact = Unpacked<contacts>;

export type works = NonNullable<NonNullable<WORKS_QUERYResult>["works"]>;
export type work = NonNullable<Unpacked<works>>;
export type workGallery = NonNullable<work["gallery"]>;
export type workGalleryImage = Unpacked<workGallery>;
export type workMainImage = work["mainImage"];
