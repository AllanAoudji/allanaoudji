// CartDispenser.tsx — reste Server Component mais sans await cookies() direct
import { cookies } from "next/headers";
import { cache, Suspense } from "react";
import { getCart } from "@/lib/shopify";
import CartClientWrapper from "./CartClientWrapper";

const getCartCached = cache(async (cartId: string | undefined) => {
	return getCart(cartId);
});

// Composant interne qui fait le travail async — lui sera dans un Suspense
async function CartDispenserInner({ children }: { children: React.ReactNode }) {
	const cartId = (await cookies()).get("cartId")?.value;
	const cart = getCartCached(cartId);
	return (
		<CartClientWrapper initialCartId={cartId} cartPromise={cart}>
			{children}
		</CartClientWrapper>
	);
}

// Composant externe qui pose le Suspense autour du seul bout qui en a besoin
export default function CartDispenser({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={null}>
			<CartDispenserInner>{children}</CartDispenserInner>
		</Suspense>
	);
}
