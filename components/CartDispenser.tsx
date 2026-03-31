import { cookies } from "next/headers";
import { cache, Suspense } from "react";
import { getCart } from "@/lib/shopify";
import { getDiscount } from "@/lib/shopify/utils/shopifyAdminFetch";
import CartClientWrapper from "./CartClientWrapper";

const getCartCached = cache(async (cartId: string | undefined) => {
	return getCart(cartId);
});

async function CartDispenserInner({ children }: { children: React.ReactNode }) {
	const cartId = (await cookies()).get("cartId")?.value;
	const [cart, discountNodes] = await Promise.all([getCartCached(cartId), getDiscount()]);

	return (
		<CartClientWrapper
			cartPromise={Promise.resolve(cart)}
			discountNodes={discountNodes}
			initialCartId={cartId}
		>
			{children}
		</CartClientWrapper>
	);
}

export default function CartDispenser({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={null}>
			<CartDispenserInner>{children}</CartDispenserInner>
		</Suspense>
	);
}
