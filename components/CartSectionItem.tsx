"use client";

import Link from "next/link";
import { DEFAULT_OPTION } from "@/lib/constants";
import { useCart } from "@/lib/contexts/cart-context";
import { createUrl } from "@/lib/utils";
import { CartEditItemQuantityButton } from "./CartEditItemQuantityButton";
import CartItemDeleteButton from "./CartItemDeleteButton";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import CartItem from "@/types/cartItem";

type MerchandiseSearchParams = {
	[key: string]: string;
};
type Props = {
	item: CartItem;
};

export function CartSectionItem({ item }: Readonly<Props>) {
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

	const { updateCartItem } = useCart();

	return (
		<li className="overflow-hidden rounded-2xl border-4">
			<div className="flex justify-between border-b-2 p-4">
				<Link href={merchandiseUrl} className="block">
					<h3 className="text-lg font-bold uppercase">{item.merchandise.product.title}</h3>
					<div className="flex gap-2 text-sm">
						{item.merchandise.selectedOptions.length > 1 &&
							item.merchandise.selectedOptions.map(option => (
								<span key={option.name}>
									<span className="font-bold uppercase">{option.name}</span>: {option.value}
								</span>
							))}
					</div>
				</Link>
				<CartItemDeleteButton item={item} optimisticUpdate={updateCartItem} />
			</div>
			<div className="bg-secondary flex items-center justify-between p-4">
				<div className="flex items-center justify-between gap-4">
					<Link className="flex" href={merchandiseUrl}>
						<ImageContainer
							image={{
								alt: item.merchandise.product.featuredImage.altText || item.merchandise.product.title,
								height: item.merchandise.product.featuredImage.height,
								width: item.merchandise.product.featuredImage.width,
								url: item.merchandise.product.featuredImage.url,
								lqip: null,
							}}
							ratio="4/3"
							className="h-32 rounded-xl border-4"
						/>
					</Link>
				</div>
				<div className="flex flex-col items-end justify-between gap-8">
					<div className="flex items-center">
						<CartEditItemQuantityButton
							item={item}
							optimisticUpdate={updateCartItem}
							type="minus"
							className="bg-primary rounded-tl-xl rounded-bl-xl"
						/>
						<div className="bg-primary flex h-8 w-16 items-center justify-center border-t-2 border-b-2 font-bold">
							<p>{item.quantity}</p>
						</div>
						<CartEditItemQuantityButton
							item={item}
							optimisticUpdate={updateCartItem}
							type="plus"
							className="bg-primary rounded-tr-xl rounded-br-xl"
						/>
					</div>
					<div className="flex gap-2">
						<p>total:</p>
						<ProductPrice className="font-bold" price={item.cost.totalAmount} />
					</div>
				</div>
			</div>
		</li>
	);
}
