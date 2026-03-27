import { ChangeEventHandler, FocusEventHandler } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import QuantityIcon from "./QuantityIcon";
import ProductVariant from "@/types/productVariant";

type Props = {
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

export default function ProductSingleBuyControlsQuantityButtons({
	className,
	decrement,
	disableDecrement,
	disableIncrement,
	increment,
	onBlur,
	onChange,
	quantity,
	size = 10,
	variant,
}: Readonly<Props>) {
	const { isCartPending, isProductPending } = useCartActions();

	const isPending = isCartPending || isProductPending;

	if (!variant?.availableForSale) {
		return null;
	}

	return (
		<div className={cn("border-quaternary flex", className)}>
			<button
				className={cn(
					"flex items-center justify-center border-t border-b border-l",
					`h-${size} w-${size}`,
				)}
				disabled={disableDecrement || isPending}
				onClick={decrement}
			>
				<QuantityIcon
					className={cn({
						"opacity-50": disableDecrement || isPending,
					})}
					type="minus"
				/>
			</button>
			<input
				className={cn(
					"border-quaternary [appearance:textfield] border-t border-b text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
					`h-${size} w-${size}`,
					{
						"text-quaternary/50": isPending,
					},
				)}
				onBlur={onBlur}
				onChange={onChange}
				disabled={isPending}
				type="number"
				value={quantity}
			/>
			<button
				className={cn(
					"flex items-center justify-center border-t border-r border-b",
					`h-${size} w-${size}`,
				)}
				disabled={disableIncrement || isPending}
				onClick={increment}
			>
				<QuantityIcon
					className={cn({
						"opacity-50": disableIncrement || isPending,
					})}
					type="plus"
				/>
			</button>
		</div>
	);
}
