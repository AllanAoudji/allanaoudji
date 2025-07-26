import imageFragment from "./image";
import seoFragment from "./seo";

const collectionFragment = /* Graphql */ `
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

export default collectionFragment;
