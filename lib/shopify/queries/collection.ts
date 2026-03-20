import collectionFragment from "../fragments/collection";
import productFragment from "../fragments/product";

export const getCollectionsQuery = /* Graphql */ `
    query getCollections {
        collections(first: 250, sortKey: TITLE) {
            edges {
                node {
                    ...collection
                }
            }
        }
    }
    ${collectionFragment}
`;

export const getCollectionProductsQuery = /* Graphql */ `
    query getCollectionProducts(
        $handle: String!
        $sortKey: ProductCollectionSortKeys
        $reverse: Boolean
        $first: Int
        $after: String
    ) {
        collection(handle: $handle) {
            products(sortKey: $sortKey, reverse: $reverse, first: $first, after: $after) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        ...product
                    }
                }
            }
        }
    }
    ${productFragment}
`;
