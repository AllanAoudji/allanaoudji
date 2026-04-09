import productFragment from "./product";

const cartFragment = /* GraphQL */ `
	fragment cart on Cart {
		id
		checkoutUrl
		discountCodes {
			code
			applicable
		}
		cost {
			subtotalAmount {
				amount
				currencyCode
			}
			totalAmount {
				amount
				currencyCode
			}
			totalTaxAmount {
				amount
				currencyCode
			}
		}
		lines(first: 100) {
			edges {
				node {
					id
					quantity
					cost {
						totalAmount {
							amount
							currencyCode
						}
						amountPerQuantity {
							amount
							currencyCode
						}
						compareAtAmountPerQuantity {
							amount
							currencyCode
						}
					}
					discountAllocations {
						discountedAmount {
							amount
							currencyCode
						}
						... on CartAutomaticDiscountAllocation {
							title
							discountedAmount {
								amount
								currencyCode
							}
						}
						... on CartCodeDiscountAllocation {
							code
							discountedAmount {
								amount
								currencyCode
							}
						}
					}
					merchandise {
						... on ProductVariant {
							id
							title
							availableForSale
							image {
								id
								url
								altText
								width
								height
							}
							selectedOptions {
								name
								value
							}
							product {
								...product
							}
						}
					}
				}
			}
		}
		totalQuantity
	}
	${productFragment}
`;

export default cartFragment;
