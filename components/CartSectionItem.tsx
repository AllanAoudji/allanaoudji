"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DEFAULT_OPTION } from "@/lib/constants";
import { useCart } from "@/lib/contexts/cart-context";
import { useCartForm } from "@/lib/contexts/cartForm-context";
import { useModal } from "@/lib/contexts/modal-context";
import { cn, createUrl } from "@/lib/utils";
import CartSectionItemQuantityButton from "./CartSectionItemQuantityButton";
import CartSectionItemQuantityDeleteButton from "./CartSectionItemQuantityDeleteButton";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import CartItem from "@/types/cartItem";

type MerchandiseSearchParams = {
	[key: string]: string;
};
type Props = {
	item: CartItem;
};

export default function CartSectionItem({ item }: Readonly<Props>) {
	const { productPending } = useCartForm();
	const { closeModal } = useModal();
	const { updateCartItem } = useCart();

	const merchandiseSearchParams: MerchandiseSearchParams = {};
	item.merchandise.selectedOptions.forEach(({ name, value }) => {
		if (value !== DEFAULT_OPTION) {
			merchandiseSearchParams[name.toLocaleLowerCase()] = value;
		}
	});
	const merchandiseUrl = createUrl(
		`/products/${item.merchandise.product.handle}`,
		new URLSearchParams(merchandiseSearchParams),
	);

	const isDeletePending = useMemo(() => {
		return (
			!!productPending && productPending.type === "UPDATE" && productPending.id === item.merchandise.id
		);
	}, [item, productPending]);

	const isPending = useMemo(() => {
		return !!productPending && productPending.isPending;
	}, [productPending]);

	return (
		<div className="grid grid-cols-3 gap-4">
			<Link className="col-span-1" href={merchandiseUrl} onClick={closeModal}>
				<ImageContainer
					image={{
						alt: item.merchandise.product.featuredImage.altText || item.merchandise.product.title,
						url: item.merchandise.product.featuredImage.url,
						width: item.merchandise.product.featuredImage.width,
						height: item.merchandise.product.featuredImage.height,
						lqip: null,
					}}
					priority={true}
					ratio="3/4"
				/>
			</Link>
			<div className="col-span-2 flex justify-between">
				<div className="flex flex-col justify-between pb-1">
					<Link className="block" href={merchandiseUrl} onClick={closeModal}>
						<h5 className="text-sm font-bold uppercase">{item.merchandise.product.title}</h5>
						<p className="text-xs">
							{!!Object.keys(merchandiseSearchParams).length &&
								item.merchandise.selectedOptions.map(selectedOption => selectedOption.value).join("/")}
						</p>
					</Link>
					<div className="flex items-center text-sm">
						<CartSectionItemQuantityButton
							className="cursor-pointer pr-2"
							isPending={isPending}
							item={item}
							optimisticUpdate={updateCartItem}
							type="minus"
						/>
						<div
							className={cn("w-6 text-center font-bold", {
								"opacity-50": isPending,
							})}
						>
							<p>{item.quantity}</p>
						</div>
						<CartSectionItemQuantityButton
							className="cursor-pointer pl-2 text-right"
							isPending={isPending}
							item={item}
							optimisticUpdate={updateCartItem}
							type="plus"
						/>
					</div>
				</div>
				<div className="flex flex-col items-end justify-between pb-1">
					<ProductPrice className="text-sm" price={item.cost.totalAmount} />
					<CartSectionItemQuantityDeleteButton
						className="text-sm"
						isPending={isDeletePending}
						item={item}
						optimisticUpdate={updateCartItem}
					/>
				</div>
			</div>
		</div>
		// <tr key={item.merchandise.id} className="hover:bg-secondary border-t last:border-b">
		// 	<CartSectionItemProduct item={item} />
		// 	<CartSectionItemQuantityContainer>
		// 		<CartSectionItemQuantity item={item} />
		// 	</CartSectionItemQuantityContainer>
		// 	<CartSectionItemPrice isPending={isPending} item={item} />
		// </tr>
	);
}
