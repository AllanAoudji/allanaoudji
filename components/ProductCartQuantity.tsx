import { ChangeEventHandler, FocusEventHandler } from "react";
import { cn } from "@/lib/utils";
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
	if (!variant?.availableForSale) {
		return null;
	}

	return (
		<div className={cn("border-quaternary flex", className)}>
			<button
				className={cn("border-t border-b border-l", `h-${size} w-${size}`)}
				disabled={disableDecrement || isPending}
				onClick={decrement}
			>
				<span
					className={cn("text-xl font-bold", {
						"font-normal opacity-50": disableDecrement || isPending,
					})}
				>
					-
				</span>
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
				className={cn("border-t border-r border-b", `h-${size} w-${size}`, {})}
				disabled={disableIncrement || isPending}
				onClick={increment}
			>
				<span
					className={cn("text-xl font-bold", {
						"font-normal opacity-50": disableIncrement || isPending,
					})}
				>
					+
				</span>
			</button>
		</div>
	);
}
