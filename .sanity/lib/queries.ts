import { defineQuery } from "next-sanity";
import { getCachedClient } from "./getClient";
import { Work } from "@/types/work";

const HOME_WORK_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    works[0...3]->{
      _id,
      "slug": slug.current,
      title,
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
export const getHomeWorks = () => getCachedClient()<{ works: Work[] }>(HOME_WORK_QUERY);

const GALLERY_WORK_QUERY = defineQuery(`
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
export const getGalleryWorks = () => getCachedClient()<{ works: Work[] }>(GALLERY_WORK_QUERY);

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

export const getWork = (slug: string) => getCachedClient()<Work>(WORK_QUERY, { slug });
