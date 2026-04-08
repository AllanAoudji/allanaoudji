import productFragment from "../fragments/product";

export const getPopularProductsQuery = /* GraphQL */ `
	query getPopularProducts($first: Int!) {
		products(first: $first, sortKey: BEST_SELLING) {
			edges {
				node {
					...product
				}
			}
		}
	}
	${productFragment}
`;
export const getLatestProductsQuery = /* GraphQL */ `
	query GetLatestProducts($first: Int!) {
		products(first: $first, sortKey: CREATED_AT, reverse: true) {
			edges {
				node {
					...product
				}
			}
		}
	}
	${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
	query getProducts(
		$sortKey: ProductSortKeys
		$reverse: Boolean
		$query: String
		$first: Int
		$after: String
	) {
		products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $first, after: $after) {
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
	${productFragment}
`;

export const getProductQuery = /* GraphQL */ `
	query getProduct($handle: String!) {
		product(handle: $handle) {
			...product
		}
	}
	${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
	query getProductRecommendations($productId: ID!) {
		productRecommendations(productId: $productId) {
			...product
		}
	}
	${productFragment}
`;

export const getProductVariantsInventoryQuery = /* GraphQL */ `
	query getProductVariantsInventory($productId: ID!) {
		product(id: $productId) {
			variants(first: 100) {
				edges {
					node {
						id
						title
						sku
						inventoryQuantity
						inventoryItem {
							tracked
						}
					}
				}
			}
		}
	}
`;
