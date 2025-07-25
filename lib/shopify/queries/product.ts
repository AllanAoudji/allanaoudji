import productFragment from "../fragments/product";

export const getProductsQuery = `
    query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $first: Int) {
        products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $first) {
            edges {
                node {
                    ...product
                }
            }
        }
    }
    ${productFragment}
`;
