"use client";

import { startTransition, useCallback, useMemo } from "react";
import { useCartForm } from "@/lib/contexts/cartForm-context";
import { cn } from "@/lib/utils";
import Product from "@/types/product";

type Props = {
	cartAction: () => void;
	className?: string;
	product: Product;
	selectedVariantId: string;
	showMessage: boolean;
};

export default function ProductCartAdd({
	cartAction,
	className,
	product,
	selectedVariantId,
	showMessage,
}: Readonly<Props>) {
	const { message, productPending, setAddProductPending } = useCartForm();

	const buttonMessage = useMemo(() => {
		if (!!productPending && productPending.isPending) {
			return "Ajout en cours...";
		}
		if (product.availableForSale) {
			return "Ajouter au panier";
		}
		return "Out of stock";
	}, [product, productPending]);

	const disable = useMemo(() => {
		return !product.availableForSale || (!!productPending && productPending.isPending);
	}, [product, productPending]);

	const displayMessage = useMemo(() => {
		return (
			showMessage &&
			!!message &&
			message.data &&
			message.data.type === "ADD" &&
			message.data.cartItem &&
			message.data.cartItem.merchandise.id === selectedVariantId
		);
	}, [message, selectedVariantId, showMessage]);

	const handleAction = useCallback(() => {
		startTransition(cartAction);
	}, [cartAction]);
	const handleClick = useCallback(() => {
		if (!disable) {
			setAddProductPending(selectedVariantId);
		}
	}, [disable, selectedVariantId, setAddProductPending]);

	return (
		<form action={handleAction} className={cn(className)}>
			<button
				className={cn(
					"bg-quaternary text-primary hover:bg-primary hover:text-quaternary border-quaternary w-full max-w-xs cursor-pointer border-2 py-3 tracking-wide uppercase",
					{
						"cursor-not-allowed bg-gray-400 hover:opacity-50":
							!product.availableForSale || !selectedVariantId,
					},
				)}
				disabled={disable}
				onClick={handleClick}
				type="submit"
			>
				{buttonMessage}
			</button>
			{displayMessage && (
				<div className="border-quaternary mt-8 border-b-2 pb-4">
					{message!.type !== "success" && (
						<div
							className={cn(
								"text-primary float-left mr-2 flex h-6 w-6 justify-around rounded-full align-baseline font-black",
								{
									"bg-red-500": message!.type === "error",
									"bg-yellow-500": message!.type === "warning",
								},
							)}
						>
							!
						</div>
					)}
					<p aria-label="polite" className="text-sm" role="status">
						{message!.message}
					</p>
				</div>
			)}
		</form>
	);
}
