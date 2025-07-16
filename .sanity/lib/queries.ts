import { defineQuery } from "next-sanity";
import { getCachedClient } from "./getClient";
import { Contact, SanityImageAsset, Work } from "@/sanity/types";

export type SanityContact = Omit<Contact, "_type" | "_createdAt" | "_updatedAt" | "_rev"> & {
	title: string;
	slug: string;
};

export type SanityImage = Omit<
	SanityImageAsset,
	| "_type"
	| "_createdAt"
	| "_updatedAt"
	| "_rev"
	| "originalFileName"
	| "label"
	| "description"
	| "altText"
	| "sha1hash"
	| "extension"
	| "mimeType"
	| "size"
	| "assetId"
	| "uploadId"
	| "path"
	| "metadata"
	| "source"
> & {
	alt: string;
	blurHash: string;
	height: number;
	lqip: string;
	url: string;
	width: number;
};

export type SanityWork = Omit<Work, "_type" | "_createdAt" | "_updatedAt" | "_rev" | "tags"> & {
	gallery: SanityImage[];
	mainImage?: SanityImage;
	slug: string;
	title: string;
};

const HOME_WORKS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    works[0...3]->{
      _id,
      title,
      "slug": slug.current,
      "mainImage": mainImage {
        alt,
        "url": asset->url,
        "_id": _key,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "blurHash": asset->metadata.blurHash,
        "lqip": asset->metadata.lqip,
      },
    }
  }
`);

export const getHomeWorks = () =>
	getCachedClient()<{ works: SanityWork[] | null }>(HOME_WORKS_QUERY);

const GALLERY_WORKS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    works[0...10]->{
      _id,
      "slug": slug.current,
      title,
      text,
      "gallery": gallery[]{
        alt,
        "url": asset->url,
        "_id": _key,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "blurHash": asset->metadata.blurHash,
        "lqip": asset->metadata.lqip,
      }
    }
  }
`);
export const getGalleryWorks = () =>
	getCachedClient()<{ works: SanityWork[] | null }>(GALLERY_WORKS_QUERY);

const WORK_QUERY = defineQuery(`
  *[_type == "work" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    title,
    text,
    "gallery": gallery[]{
      alt,
      "url": asset->url,
      "_id": _key,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "blurHash": asset->metadata.blurHash,
      "lqip": asset->metadata.lqip,
    }
  }  
`);
export const getWork = (slug: string) => getCachedClient()<SanityWork | null>(WORK_QUERY, { slug });

const CONTACT_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    contacts[0...10]->{
      _id,
      "slug": slug.current,
      text,
      title,
      url,
      blank
    }
  }
`);
export const getContact = () =>
	getCachedClient()<{ contacts: SanityContact[] | null }>(CONTACT_QUERY);
