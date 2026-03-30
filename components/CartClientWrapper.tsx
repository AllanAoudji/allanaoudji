"use client";

import { useCallback, useState, Suspense } from "react";
import { CartProvider } from "@/lib/contexts/cart-context";
import { CartRecoveryProvider } from "@/lib/contexts/cartRecovery-context";
import { getCart } from "@/lib/shopify";
import CartDispenserErrorBoundary from "./CartDispenserErrorBoundary";
import Cart from "@/types/cart";
import { DiscountNode } from "@/types/shopifyDiscount";

type Props = {
	children: React.ReactNode;
	initialCartId: string | undefined;
	cartPromise: Promise<Cart | undefined>;
	discountNodes: DiscountNode[];
};

export default function CartClientWrapper({
	children,
	initialCartId,
	cartPromise,
	discountNodes,
}: Readonly<Props>) {
	const [currentCartPromise, setCurrentCartPromise] = useState(cartPromise);
	const [currentCartId, setCurrentCartId] = useState(initialCartId);
	const [hasError, setHasError] = useState(false);

	const onCartCreated = useCallback((newCartId: string) => {
		setCurrentCartId(newCartId);
		setCurrentCartPromise(getCart(newCartId));
		setHasError(false);
	}, []);

	if (hasError) {
		return <CartRecoveryProvider onCartCreated={onCartCreated}>{children}</CartRecoveryProvider>;
	}

	return (
		<CartDispenserErrorBoundary onError={() => setHasError(true)}>
			<Suspense fallback={null}>
				<CartProvider
					cartPromise={currentCartPromise}
					cartId={currentCartId}
					discountNodes={discountNodes}
				>
					{children}
				</CartProvider>
			</Suspense>
		</CartDispenserErrorBoundary>
	);
}
