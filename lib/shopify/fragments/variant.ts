const variantFragment = /* Graphql */ `
    fragment variant on ProductVariant {
        id
        title
        availableForSale
        quantityAvailable
        selectedOptions {
            name
            value
        }
        price {
            amount
            currencyCode
        }
    }
`;

export default variantFragment;
