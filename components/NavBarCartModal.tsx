"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { useCartModal } from "@/lib/contexts/cartModal-context";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";

type Props = {
	className?: string;
};

export default function NavBarCartModal({ className }: Readonly<Props>) {
	const { cart } = useCart();
	const { isOpenCartModal, handleCloseCartModal, cartItem } = useCartModal();

	const modalRef = useRef<HTMLDivElement | null>(null);

	const hasNoOptions = useMemo(() => {
		return (
			!cartItem ||
			!cartItem.merchandise.selectedOptions.length ||
			(cartItem.merchandise.selectedOptions.length === 1 &&
				cartItem.merchandise.selectedOptions[0].value === "Default Title" &&
				cartItem.merchandise.selectedOptions[0].name === "Title")
		);
	}, [cartItem]);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				handleCloseCartModal();
			}
		},
		[handleCloseCartModal],
	);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [handleClickOutside]);

	if (!isOpenCartModal || !cartItem) {
		return null;
	}

	return (
		<div
			className={cn(
				"bg-primary border-quaternary absolute right-0 w-92 border-2 p-8 shadow-xl",
				className,
			)}
			ref={modalRef}
		>
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm">Article(s) ajouté(s) au panier</p>
				<div className="cursor-pointer pl-2" onClick={handleCloseCartModal}>
					<p className="text-xl">x</p>
				</div>
			</div>
			<div className="mb-8 grid grid-cols-3 gap-4">
				<ImageContainer
					image={{
						alt: cartItem.merchandise.product.featuredImage.altText || cartItem.merchandise.product.title,
						height: cartItem.merchandise.product.featuredImage.height,
						width: cartItem.merchandise.product.featuredImage.width,
						url: cartItem.merchandise.product.featuredImage.url,
						lqip: null,
					}}
					ratio="3/4"
					className="col-span-1"
				/>
				<div className="col-span-2">
					<p className="pb-2 text-sm font-bold uppercase">{cartItem.merchandise.product.title}</p>
					{!hasNoOptions &&
						cartItem.merchandise.selectedOptions.map(option => (
							<p key={option.name} className="text-xs italic">
								<span className="font-bold uppercase">{option.name}</span> : {option.value}
							</p>
						))}
				</div>
			</div>
			<Link
				className="border-quaternary hover:bg-quaternary hover:text-primary mb-4 block w-full items-center border-2 p-3 text-center"
				href="/basket"
			>
				Voir le panier {cart?.totalQuantity ? `(${cart.totalQuantity})` : ""}
			</Link>
			<button className="bg-quaternary text-primary mb-4 h-12 w-full text-center">
				Procéder au paiement
			</button>
			<p onClick={handleCloseCartModal} className="cursor-pointer text-center underline">
				Continuer les achats
			</p>
		</div>
	);
}
