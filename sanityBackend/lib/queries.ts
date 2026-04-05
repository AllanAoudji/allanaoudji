import { WORKS_SITEMAP_QUERY_RESULT } from "../types";
import { defineQuery } from "next-sanity";
import { TAGS, workTag } from "@/lib/constants";
import { sanityFetchStatic } from "./client";
import { sanityFetch } from "./live";

/*-----------------------------------
-- Queries --------------------------
-----------------------------------*/

const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0]{
    content[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip
        }
      }
    },
  }
`);

const BANNER_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    banner
  }
`);

const CONTACTS_QUERY = defineQuery(`
  *[_type == "contact" && (hidden == false || !defined(hidden))] | order(orderRank) [0...10]{
    _id,
    "slug": slug.current,
    text,
    title,
    url,
    blank
  }
`);

const GENERAL_CONDITION_OF_SALE_QUERY = defineQuery(`
  *[_type == "generalConditionsOfSale"][0]{
    content[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip
        }
      }
    },
    _updatedAt
  }
`);

const LEGAL_NOTICES_QUERY = defineQuery(`
  *[_type == "legalNotices"][0]{
    content[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip
        }
      }
    },
    _updatedAt
  }
`);

const PRIVACY_POLICY_QUERY = defineQuery(`
  *[_type == "privacyPolicy"][0]{
    content[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip
        }
      }
    },
    _updatedAt
  }
`);

const SHIPPING_POLICY_QUERY = defineQuery(`
  *[_type == "shippingPolicy"][0]{
    content[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip
        }
      }
    },
    _updatedAt
  }  
`);

const WORKS_QUERY = defineQuery(`
  {
    "total": count(*[_type == "work" && (hidden == false || !defined(hidden))]),
    "works": *[_type == "work" && (hidden == false || !defined(hidden))] | order(orderRank) [$from...$to]{
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
        "_id": _key,
        alt,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "blurHash": asset->metadata.blurHash,
        "lqip": asset->metadata.lqip,
      }
    }
  }
`);

export const WORKS_SITEMAP_QUERY = defineQuery(`
  *[_type == "work" && (hidden == false || !defined(hidden))]{
    "slug": slug.current,
    _updatedAt
  }
`);

const WORK_QUERY = defineQuery(`
  *[_type == "work" && (hidden == false || !defined(hidden)) && slug.current == $slug][0]{
    _id,
    _updatedAt,
    "slug": slug.current,
    title,
    text,
    seo,
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
// studio/lib/queries.ts
export const getWork = (slug: string) => {
	return sanityFetch({
		query: WORK_QUERY,
		params: { slug },
		tags: [TAGS.sanityWorks, workTag(slug)],
	});
};

export const getWorks = (from: number, to: number) => {
	return sanityFetch({ query: WORKS_QUERY, params: { from, to }, tags: [TAGS.sanityWorks] });
};

export const getAbout = () => {
	return sanityFetch({ query: ABOUT_QUERY, tags: [TAGS.sanityAbout] });
};

export const getBanner = () => {
	return sanityFetch({ query: BANNER_QUERY, tags: [TAGS.sanitySettings] });
};

export const getContacts = () => {
	return sanityFetch({ query: CONTACTS_QUERY, tags: [TAGS.sanitySettings] });
};

// pages légales → même tag car changent ensemble
export const getGeneralConditionOfSale = () => {
	return sanityFetch({ query: GENERAL_CONDITION_OF_SALE_QUERY, tags: [TAGS.sanityPages] });
};

export const getLegalNotices = () => {
	return sanityFetch({ query: LEGAL_NOTICES_QUERY, tags: [TAGS.sanityPages] });
};

export const getPrivacyPolicy = () => {
	return sanityFetch({ query: PRIVACY_POLICY_QUERY, tags: [TAGS.sanityPages] });
};

export const getShippingPolicy = () => {
	return sanityFetch({ query: SHIPPING_POLICY_QUERY, tags: [TAGS.sanityPages] });
};

export const getStaticWorksSiteMap = () => {
	return sanityFetchStatic<WORKS_SITEMAP_QUERY_RESULT>({
		query: WORKS_SITEMAP_QUERY,
	});
};
