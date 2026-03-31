export const getDiscountsQuery = `
	query GetDiscounts {
		discountNodes(first: 20) {
			edges {
				node {
					id
					discount {
						__typename

						... on DiscountCodeBasic {
							title
							startsAt
							endsAt
							combinesWith { orderDiscounts productDiscounts shippingDiscounts }
							codes(first: 5) { edges { node { code } } }
							customerGets {
								value {
									... on DiscountPercentage { __typename percentage }
									... on DiscountAmount { __typename amount { amount currencyCode } }
								}
								items {
									... on AllDiscountItems { __typename allItems }
									... on DiscountProducts {
										__typename
										products(first: 50) { edges { node { id title handle } } }
										productVariants(first: 50) { edges { node { id title product { id title } } } }
									}
									... on DiscountCollections {
										__typename
										collections(first: 20) { edges { node { id title handle } } }
									}
								}
							}
						}

						... on DiscountAutomaticBasic {
							title
							startsAt
							endsAt
							combinesWith { orderDiscounts productDiscounts shippingDiscounts }
							customerGets {
								value {
									... on DiscountPercentage { __typename percentage }
									... on DiscountAmount { __typename amount { amount currencyCode } }
								}
								items {
									... on AllDiscountItems { __typename allItems }
									... on DiscountProducts {
										__typename
										products(first: 50) { edges { node { id title handle } } }
										productVariants(first: 50) { edges { node { id title product { id title } } } }
									}
									... on DiscountCollections {
										__typename
										collections(first: 20) { edges { node { id title handle } } }
									}
								}
							}
						}

						... on DiscountCodeFreeShipping {
							title
							startsAt
							endsAt
							combinesWith { orderDiscounts productDiscounts shippingDiscounts }
							maximumShippingPrice { amount }
							minimumRequirement {
								... on DiscountMinimumSubtotal {
									greaterThanOrEqualToSubtotal { amount currencyCode }
								}
							}
						}

						... on DiscountAutomaticFreeShipping {
							title
							startsAt
							endsAt
							combinesWith { orderDiscounts productDiscounts shippingDiscounts }
							maximumShippingPrice { amount }
							minimumRequirement {
								... on DiscountMinimumSubtotal {
									greaterThanOrEqualToSubtotal { amount currencyCode }
								}
							}
						}
					}
				}
			}
		}
	}
`;
