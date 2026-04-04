import imageFragment from "./image";
import seoFragment from "./seo";

export const collectionServerFragment = /* Graphql */ `
    fragment collection on Collection {
        handle
        title
        description
        seo {
            ...seo
        }
        image {
            ...image
        }
        updatedAt
        productsCount {
          count
        }
    }
    ${seoFragment}
    ${imageFragment}
`;

export const collectionClientFragment = /* Graphql */ `
    fragment collection on Collection {
        handle
        title
        description
        seo {
            ...seo
        }
        image {
            ...image
        }
        updatedAt
    }
    ${seoFragment}
    ${imageFragment}
`;
