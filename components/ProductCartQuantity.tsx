"use client";

import { ChangeEventHandler, FocusEventHandler, useMemo } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { cn, getLineQuantity } from "@/lib/utils";
import ProductVariant from "@/types/productVariant";

type Props = {
	isPending: boolean;
	className?: string;
	decrement: () => void;
	disableDecrement: boolean;
	disableIncrement: boolean;
	increment: () => void;
	onBlur: FocusEventHandler<HTMLInputElement>;
	onChange: ChangeEventHandler<HTMLInputElement>;
	quantity: number | string;
	size?: number;
	variant: ProductVariant | undefined;
};

export default function ProductCartQuantity({
	className,
	decrement,
	isPending,
	disableDecrement,
	disableIncrement,
	increment,
	onBlur,
	onChange,
	quantity,
	size = 10,
	variant,
}: Readonly<Props>) {
	const { cart } = useCart();

	const itemInCart = useMemo(() => {
		return !!variant && !!cart ? getLineQuantity(cart, variant.id) : undefined;
	}, [cart, variant]);

	if (!variant?.availableForSale) {
		return null;
	}

	return (
		<div className={cn(className)}>
			<h4 className="mb-1 text-sm">Quantité{!!itemInCart && ` (${itemInCart} dans le panier)`}</h4>
			<div className={cn("border-quaternary inline-block border-2", className)}>
				<button
					className={cn("text-xl font-bold", `h-${size} w-${size}`, {
						"font-normal opacity-50": disableDecrement || isPending,
					})}
					disabled={disableDecrement || isPending}
					onClick={decrement}
				>
					-
				</button>
				<input
					className={cn(
						"[appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
						`h-${size} w-${size}`,
						{
							"opacity-50": isPending,
						},
					)}
					onBlur={onBlur}
					onChange={onChange}
					disabled={isPending}
					type="number"
					value={quantity}
				/>
				<button
					className={cn("text-xl font-bold", `h-${size} w-${size}`, {
						"font-normal opacity-50": disableIncrement || isPending,
					})}
					disabled={disableIncrement || isPending}
					onClick={increment}
				>
					+
				</button>
			</div>
		</div>
	);
}
