import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

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
          "lqip": asset->metadata.lqip
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
          "lqip": asset->metadata.lqip
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
          "lqip": asset->metadata.lqip
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
          "lqip": asset->metadata.lqip
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
	return sanityFetch({ query: ABOUT_QUERY });
};

export const getBanner = () => {
	return sanityFetch({ query: BANNET_QUERY });
};

export const getContacts = () => {
	return sanityFetch({ query: CONTACTS_QUERY });
};

export const getGeneralConditionOfSale = () => {
	return sanityFetch({ query: GENERAL_CONDITION_OF_SALE_QUERY });
};

export const getLegalNotices = () => {
	return sanityFetch({ query: LEGAL_NOTICES_QUERY });
};

export const getPrivacyPolicy = () => {
	return sanityFetch({ query: PRIVACY_POLICY_QUERY });
};

export const getWorks = (from: number, to: number) => {
	return sanityFetch({ query: WORKS_QUERY, params: { from, to } });
};

export const getWork = (slug: string) => {
	return sanityFetch({ query: WORK_QUERY, params: { slug } });
};
