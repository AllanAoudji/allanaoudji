"use client";

import { useCallback, useState, Suspense } from "react";
import { CartProvider } from "@/lib/contexts/cart-context";
import { CartRecoveryProvider } from "@/lib/contexts/cartRecovery-context";
import { getCart } from "@/lib/shopify";
import CartDispenserErrorBoundary from "./CartDispenserErrorBoundary";
import Cart from "@/types/cart";
import { DiscountNode } from "@/types/shopifyDiscount";

type Props = {
	cartPromise: Promise<Cart | undefined>;
	children: React.ReactNode;
	discountNodes: DiscountNode[];
	initialCartId: string | undefined;
};

export default function CartClientWrapper({
	cartPromise,
	children,
	discountNodes,
	initialCartId,
}: Readonly<Props>) {
	const [currentCartId, setCurrentCartId] = useState(initialCartId);
	const [currentCartPromise, setCurrentCartPromise] = useState(cartPromise);
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
					cartId={currentCartId}
					cartPromise={currentCartPromise}
					discountNodes={discountNodes}
				>
					{children}
				</CartProvider>
			</Suspense>
		</CartDispenserErrorBoundary>
	);
}
