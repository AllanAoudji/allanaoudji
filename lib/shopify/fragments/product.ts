import imageFragment from "./image";
import seoFragment from "./seo";
import variantFragment from "./variant";

const productFragment = /* GraphQl */ `
    fragment product on Product {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        options {
            id
            name
            values
        }
        priceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        variants(first: 250) {
            edges {
                node {
                    ...variant
                }
            }
        }
        featuredImage {
            ...image
        }
        images(first: 20) {
            edges {
                node {
                    ...image
                }
            }
        }
        seo {
            ...seo
        }
        tags
        updatedAt
    }
    ${imageFragment}
    ${seoFragment}
    ${variantFragment}
`;

export default productFragment;
