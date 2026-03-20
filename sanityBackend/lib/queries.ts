import { defineQuery } from "next-sanity";
import { client } from "./client";
import {
	BANNET_QUERYResult,
	CONTACTS_QUERYResult,
	WORK_QUERYResult,
	WORKS_QUERYResult,
} from "@/sanity/types";

/*-----------------------------------
-- Queries --------------------------
-----------------------------------*/

const BANNET_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    banner
  }
`);

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

const WORKS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    "total": count(works),
    works[$from...$to]{
      "_id": _key,
      ...(@-> {
        "slug": slug.current,
        title,
        text,
        mainImage{
          alt,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip,
        },
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
    mainImage{
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip,
    },
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

export const getBanner = () => {
	return client.fetch<BANNET_QUERYResult>(BANNET_QUERY);
};

export const getContacts = () => {
	return client.fetch<CONTACTS_QUERYResult>(CONTACTS_QUERY);
};

export const getWorks = (from: number, to: number) => {
	return client.fetch<WORKS_QUERYResult>(WORKS_QUERY, { from, to });
};

export const getWork = (slug: string) => {
	return client.fetch<WORK_QUERYResult>(WORK_QUERY, { slug });
};
