import { cookies } from "next/headers";
import { cache } from "react";
import { getCart } from "@/lib/shopify";
import CartClientWrapper from "./CartClientWrapper";

type Props = {
	children: React.ReactNode;
};

const getCartCached = cache(async (cartId: string | undefined) => {
	return getCart(cartId);
});

export default async function CartDispenser({ children }: Readonly<Props>) {
	const cartId = (await cookies()).get("cartId")?.value;
	const cart = getCartCached(cartId);

	return (
		<CartClientWrapper initialCartId={cartId} cartPromise={cart}>
			{children}
		</CartClientWrapper>
	);
}
