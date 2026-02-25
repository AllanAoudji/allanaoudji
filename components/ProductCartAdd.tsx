"use client";

import { useCallback, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import MessageCallback from "@/types/messageCallback";
import Product from "@/types/product";

type Props = {
	cartAction: () => void;
	className?: string;
	disableButton: boolean;
	isPending: boolean;
	message: MessageCallback;
	onClick?: () => void;
	product: Product;
	selectedVariantId: string | undefined;
	showMessage: boolean;
};

export default function ProductCartAdd({
	cartAction,
	className,
	disableButton,
	isPending,
	message,
	onClick,
	product,
	selectedVariantId,
	showMessage,
}: Readonly<Props>) {
	const { availableForSale } = product;

	const buttonMessage = useMemo(() => {
		if (isPending) {
			return "Ajout en cours...";
		}
		if (availableForSale) {
			return "Ajouter au panier";
		}
		return "Out of stock";
	}, [availableForSale, isPending]);

	const handleClick = useCallback(() => {
		if (onClick && !disableButton && !isPending && availableForSale && selectedVariantId) {
			onClick();
		}
	}, [availableForSale, disableButton, isPending, onClick, selectedVariantId]);

	useEffect(() => {
		console.log(isPending);
	}, [isPending]);

	return (
		<form action={cartAction} className={cn(className)}>
			<button
				className={cn(
					"bg-quaternary text-primary hover:bg-primary hover:text-quaternary border-quaternary w-full max-w-xs cursor-pointer border-2 py-3 tracking-wide uppercase",
					{
						"cursor-not-allowed bg-gray-400 hover:opacity-50": !availableForSale || !selectedVariantId,
					},
				)}
				disabled={!availableForSale || !selectedVariantId || disableButton}
				onClick={handleClick}
			>
				{buttonMessage}
			</button>
			{!!message && showMessage && (
				<div className="border-quaternary mt-8 border-b-2 pb-4">
					{message.type !== "success" && (
						<div
							className={cn(
								"text-primary float-left mr-2 flex h-6 w-6 justify-around rounded-full align-baseline font-black",
								{
									"bg-red-500": message.type === "error",
									"bg-yellow-500": message.type === "warning",
								},
							)}
						>
							!
						</div>
					)}
					<p aria-label="polite" className="text-sm" role="status">
						{message.message}
					</p>
				</div>
			)}
		</form>
	);
}
