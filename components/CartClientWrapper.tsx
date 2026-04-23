"use client";

import { useCallback, useState, Suspense, useEffect, useRef } from "react";
import createCartAndSetCookie from "@/lib/actions/createCartAndSetCookie";
import { getCartAction } from "@/lib/actions/getCartAction";
import { resetCartCookie } from "@/lib/actions/resetCartCookie";
import { CartProvider } from "@/lib/contexts/cart-context";
import { CartRecoveryProvider } from "@/lib/contexts/cartRecovery-context";
import CartDispenserErrorBoundary from "./CartDispenserErrorBoundary";
import Cart from "@/types/cart";
import { DiscountNode } from "@/types/shopifyDiscount";

type Props = {
	cartPromise: Promise<Cart | undefined>;
	children: React.ReactNode;
	discountNodes: DiscountNode[];
	initialCartId: string | undefined;
	shouldResetCart: boolean;
};

export default function CartClientWrapper({
	cartPromise,
	children,
	discountNodes,
	initialCartId,
	shouldResetCart,
}: Readonly<Props>) {
	const [currentCartId, setCurrentCartId] = useState(initialCartId);
	const [currentCartPromise, setCurrentCartPromise] = useState(cartPromise);
	const [hasError, setHasError] = useState(false);

	const resetDoneRef = useRef(false);
	const creatingRef = useRef(false);

	const onCartCreated = useCallback((newCartId: string) => {
		setCurrentCartId(newCartId);
		setCurrentCartPromise(getCartAction(newCartId));
		setHasError(false);
	}, []);

	useEffect(() => {
		if (!shouldResetCart) return;
		if (resetDoneRef.current) return;

		resetDoneRef.current = true;

		(async () => {
			await resetCartCookie();

			// important: on clear le state local aussi
			setCurrentCartId(undefined);
			setCurrentCartPromise(Promise.resolve(undefined));
		})();
	}, [shouldResetCart]);

	useEffect(() => {
		if (currentCartId) return;
		if (creatingRef.current) return;
		if (shouldResetCart) return;

		creatingRef.current = true;

		createCartAndSetCookie()
			.then(newCartId => {
				onCartCreated(newCartId);
			})
			.finally(() => {
				creatingRef.current = false;
			});
	}, [currentCartId, shouldResetCart, onCartCreated]);

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
