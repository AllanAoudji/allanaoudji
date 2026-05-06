"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DEFAULT_OPTION } from "@/lib/constants";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { useModal } from "@/lib/contexts/modal-context";
import { cn, createUrl } from "@/lib/utils";
import CartContenItemCallbackMessage from "./CartContentItemCallbackMessage";
import CartContentItemDeleteButton from "./CartContentItemDeleteButton";
import CartContentItemQuantityButton from "./CartContentItemQuantityButton";
import ImageContainer from "./ImageContainer";
import Price from "./Price";
import CartItem from "@/types/cartItem";

type MerchandiseSearchParams = {
	[key: string]: string;
};

type Props = {
	item: CartItem;
};

function getCartItemPricing(item: CartItem) {
	const totalAmount = item.cost.totalAmount;
	const currencyCode = totalAmount.currencyCode;

	const totalDiscounted = (item.discountAllocations ?? []).reduce(
		(sum, alloc) => sum + parseFloat(alloc.discountedAmount.amount),
		0,
	);

	if (totalDiscounted === 0) {
		return { original: totalAmount, discounted: null };
	}

	// Prix original = prix brut unitaire × quantité
	const unitPrice = item.originalUnitPrice
		? parseFloat(item.originalUnitPrice)
		: parseFloat(totalAmount.amount) / item.quantity;

	const originalTotal = (unitPrice * item.quantity).toFixed(2);

	return {
		original: { amount: originalTotal, currencyCode }, // ← 30€ barré ✅
		discounted: totalAmount, // ← 24€ en gras ✅
	};
}

export default function CartContentItem({ item }: Readonly<Props>) {
	const { isCartPending } = useCartActions();
	const { closeModal } = useModal();

	const isAvailable = item.merchandise?.availableForSale !== false;

	const image = useMemo(
		() => item.merchandise?.image ?? item.merchandise?.product?.featuredImage,
		[item],
	);

	const { discounted, original } = getCartItemPricing(item);

	const merchandiseSearchParams: MerchandiseSearchParams = {};
	item.merchandise?.selectedOptions?.forEach(({ name, value }) => {
		if (value !== DEFAULT_OPTION) {
			merchandiseSearchParams[name.toLocaleLowerCase()] = value;
		}
	});
	const searchParams = new URLSearchParams(merchandiseSearchParams);
	const merchandiseUrl = createUrl(`/products/${item.merchandise.product.handle}`, searchParams);

	if (!item.merchandise?.id) return null;

	if (!isAvailable) {
		return (
			<div className="rounded border border-amber-200 bg-amber-50 p-3">
				<p className="mb-2 text-sm font-bold uppercase">{item.merchandise.product.title}</p>
				<p className="mb-3 text-sm text-amber-900">Ce produit n&apos;est plus disponible à la vente.</p>
				<CartContentItemDeleteButton item={item} />
			</div>
		);
	}

	return (
		<div>
			<CartContenItemCallbackMessage className="mb-2" item={item} />

			<div className="grid grid-cols-3 gap-4">
				<Link className="col-span-1" href={merchandiseUrl} onClick={closeModal}>
					<ImageContainer image={image} priority={true} ratio="3/4" sizes="15vw" />
				</Link>

				<div className="col-span-2 flex justify-between gap-2">
					<div className="flex grow flex-col justify-between pb-1">
						<Link className="block" href={merchandiseUrl} onClick={closeModal}>
							<h5 className="text-sm font-bold uppercase">{item.merchandise.product.title}</h5>
							<p className="text-xs">
								{!!Object.keys(merchandiseSearchParams).length &&
									item.merchandise?.selectedOptions?.map(o => o.value).join("/")}
							</p>
						</Link>

						<div className="flex items-center text-sm">
							<CartContentItemQuantityButton className="cursor-pointer pr-1" item={item} type="minus" />
							<div className={cn("w-6 text-center font-bold", { "opacity-50": isCartPending })}>
								<p>{item.quantity}</p>
							</div>
							<CartContentItemQuantityButton
								className="cursor-pointer pl-1 text-right"
								item={item}
								type="plus"
							/>
						</div>
					</div>

					<div className="flex flex-col items-end justify-between pb-1">
						<div className="flex flex-col items-end">
							{discounted && <Price className="text-sm font-bold" price={discounted} />}
							<Price
								className={cn("text-sm", {
									"line-through opacity-50": discounted,
									"font-bold": !discounted,
								})}
								price={original}
							/>
						</div>
						<CartContentItemDeleteButton className="text-sm" item={item} />
					</div>
				</div>
			</div>
		</div>
	);
}
