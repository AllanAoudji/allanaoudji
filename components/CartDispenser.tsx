import { cookies } from "next/headers";
import { cache, Suspense } from "react";
import { getCart } from "@/lib/shopify";
import { getDiscount } from "@/lib/shopify/utils/shopifyAdminFetch";
import CartClientWrapper from "./CartClientWrapper";

const getCartCached = cache(async (cartId: string | undefined) => {
	return getCart(cartId);
});

async function CartDispenserInner({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const cartId = cookieStore.get("cartId")?.value;
	const [cart, discountNodes] = await Promise.all([getCartCached(cartId), getDiscount()]);

	const shouldResetCart = !!cartId && !cart;

	return (
		<CartClientWrapper
			cartPromise={Promise.resolve(cart)}
			discountNodes={discountNodes}
			initialCartId={cart ? cartId : undefined}
			shouldResetCart={shouldResetCart}
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
