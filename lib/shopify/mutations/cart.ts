import cartFragment from "../fragments/cart";

const addToCartMutation = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
    }
    ${cartFragment}
`;

export default addToCartMutation;
