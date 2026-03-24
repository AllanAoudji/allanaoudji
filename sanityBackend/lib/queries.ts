import {
	ABOUT_QUERY_RESULT,
	BANNET_QUERY_RESULT,
	CONTACTS_QUERY_RESULT,
	GENERAL_CONDITION_OF_SALE_QUERY_RESULT,
	LEGAL_NOTICES_QUERY_RESULT,
	PRIVACY_POLICY_QUERY_RESULT,
	WORK_QUERY_RESULT,
	WORKS_QUERY_RESULT,
} from "../types";
import { defineQuery } from "next-sanity";
import { client } from "./client";

/*-----------------------------------
-- Queries --------------------------
-----------------------------------*/

const ABOUT_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    about[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    }
  }
`);

const BANNET_QUERY = defineQuery(/* GraphQL */ `
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

const GENERAL_CONDITION_OF_SALE_QUERY = defineQuery(`
  *[_type == "legalSettings"][0]{
    generalConditionsOfSale[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    },
    _updatedAt
  }
`);

const LEGAL_NOTICES_QUERY = defineQuery(`
  *[_type == "legalSettings"][0]{
    legalNotices[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    },
    _updatedAt
  }
`);

const PRIVACY_POLICY_QUERY = defineQuery(`
  *[_type == "legalSettings"][0]{
    privacyPolicy[]{
      ...,
      _type == "figure" => {
        ...,
        "image": image{
          ...,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    },
    _updatedAt
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

export const getAbout = () => {
	return client.fetch<ABOUT_QUERY_RESULT>(ABOUT_QUERY);
};

export const getBanner = () => {
	return client.fetch<BANNET_QUERY_RESULT>(BANNET_QUERY);
};

export const getContacts = () => {
	return client.fetch<CONTACTS_QUERY_RESULT>(CONTACTS_QUERY);
};

export const getGeneralConditionOfSale = () => {
	return client.fetch<GENERAL_CONDITION_OF_SALE_QUERY_RESULT>(GENERAL_CONDITION_OF_SALE_QUERY);
};

export const getLegalNotices = () => {
	return client.fetch<LEGAL_NOTICES_QUERY_RESULT>(LEGAL_NOTICES_QUERY);
};

export const getPrivacyPolicy = () => {
	return client.fetch<PRIVACY_POLICY_QUERY_RESULT>(PRIVACY_POLICY_QUERY);
};

export const getWorks = (from: number, to: number) => {
	return client.fetch<WORKS_QUERY_RESULT>(WORKS_QUERY, { from, to });
};

export const getWork = (slug: string) => {
	return client.fetch<WORK_QUERY_RESULT>(WORK_QUERY, { slug });
};
