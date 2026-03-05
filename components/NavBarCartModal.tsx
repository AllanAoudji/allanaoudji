"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { useCartForm } from "@/lib/contexts/cartForm-context";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";

type Props = {
	className?: string;
};

export default function NavBarCartModal({ className }: Readonly<Props>) {
	const { cart } = useCart();
	const { isOpenCartModal, handleCloseCartModal, cartModalItem } = useCartForm();

	const modalRef = useRef<HTMLDivElement | null>(null);

	const hasNoOptions = useMemo(() => {
		return (
			!cartModalItem ||
			!cartModalItem.merchandise.selectedOptions.length ||
			(cartModalItem.merchandise.selectedOptions.length === 1 &&
				cartModalItem.merchandise.selectedOptions[0].value === "Default Title" &&
				cartModalItem.merchandise.selectedOptions[0].name === "Title")
		);
	}, [cartModalItem]);

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

	if (!isOpenCartModal || !cartModalItem) {
		return null;
	}

	return (
		<div
			className={cn(
				"bg-quaternary text-primary border-primary lg:border-quaternary lg:bg-primary lg:text-quaternary fixed inset-x-0 top-20 w-full border-2 p-8 shadow-xl lg:absolute lg:inset-x-auto lg:right-12 lg:w-92",
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

			<div className="grid grid-cols-2 gap-4 lg:block">
				<div className="col-span-1 block grid-cols-3 gap-4 lg:mb-8 lg:grid">
					<ImageContainer
						image={{
							alt:
								cartModalItem.merchandise.product.featuredImage.altText ||
								cartModalItem.merchandise.product.title,
							height: cartModalItem.merchandise.product.featuredImage.height,
							width: cartModalItem.merchandise.product.featuredImage.width,
							url: cartModalItem.merchandise.product.featuredImage.url,
							lqip: null,
						}}
						ratio="3/4"
						className="col-span-1 hidden lg:block"
					/>
					<div className="col-span-2">
						<p className="pb-0 text-sm font-bold uppercase lg:pb-2">
							{cartModalItem.merchandise.product.title}
						</p>
						{!hasNoOptions &&
							cartModalItem.merchandise.selectedOptions.map(option => (
								<p key={option.name} className="text-xs italic">
									<span className="font-bold uppercase">{option.name}</span> : {option.value}
								</p>
							))}
					</div>
				</div>
				<div className="col-span-1">
					<Link
						className="border-primary lg:border-quaternary hover:bg-quaternary hover:text-primary mb-0 ml-auto block w-full max-w-80 items-center border-2 p-3 text-center lg:mb-4"
						onClick={handleCloseCartModal}
						href="/basket"
					>
						Voir le panier {cart?.totalQuantity ? `(${cart.totalQuantity})` : ""}
					</Link>
					<button className="bg-primary text-quaternary lg:bg-quaternary lg:text-primary mb-4 hidden h-12 w-full text-center lg:block">
						Procéder au paiement
					</button>
				</div>
				<p onClick={handleCloseCartModal} className="col-span-2 cursor-pointer text-center underline">
					Continuer les achats
				</p>
			</div>
		</div>
	);
}
