import { defineQuery } from "next-sanity";
import { client } from "./client";
import { Contact, SanityImageAsset, Work } from "@/sanity/types";

/*-----------------------------------
-- Types ----------------------------
-----------------------------------*/

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

/*-----------------------------------
-- Queries --------------------------
-----------------------------------*/

const CONTACTS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    contacts[0...10]{
      "_id": _key,
      ...(@-> {
        "slug": slug.current,
        text,
        title,
        url,
        blank
      })
    }
  }
`);

const HOME_WORKS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    works[0...3]{
      "_id": _key,
      ...(@-> {
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
      })
    }
  }
`);

const GALLERY_WORKS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    works[0...10]{
      "_id": _key,
      ...(@-> {
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
      })
    }
  }
`);

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

/*-----------------------------------
-- Fetchs ---------------------------
-----------------------------------*/

export const getContacts = () => {
	return client.fetch<{ contacts: SanityContact[] | null }>(CONTACTS_QUERY);
};

export const getGalleryWorks = () => {
	return client.fetch<{ works: SanityWork[] | null }>(GALLERY_WORKS_QUERY);
};

export const getHomeWorks = () => {
	return client.fetch<{ works: SanityWork[] | null }>(HOME_WORKS_QUERY);
};

export const getWork = (slug: string) => {
	return client.fetch<SanityWork | null>(WORK_QUERY, { slug });
};
