import { cookies } from "next/headers";
import { cache, Suspense } from "react";
import { CartProvider } from "@/lib/contexts/cart-context";
import { getCart } from "@/lib/shopify";
import CartDispenserErrorBoundary from "./CartDispenserErrorBoundary";

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
		<CartDispenserErrorBoundary>
			<Suspense fallback={null}>
				<CartProvider cartPromise={cart}>{children}</CartProvider>
			</Suspense>
		</CartDispenserErrorBoundary>
	);
}
