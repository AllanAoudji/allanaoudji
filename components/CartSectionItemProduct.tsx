import Image from "next/image";
import Link from "next/link";
import { DEFAULT_OPTION } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import CartSectionItemQuantity from "./CartSectionItemQuantity";
import ProductPrice from "./ProductPrice";
import CartItem from "@/types/cartItem";

type MerchandiseSearchParams = {
	[key: string]: string;
};
type Props = {
	item: CartItem;
};

export default function CartSectionItemProduct({ item }: Readonly<Props>) {
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

	return (
		<td className="flex gap-4 py-12 whitespace-nowrap">
			<Link href={`/products/${merchandiseUrl}`}>
				<Image
					alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
					className="w-32"
					height={item.merchandise.product.featuredImage.height}
					src={item.merchandise.product.featuredImage.url}
					width={item.merchandise.product.featuredImage.width}
				/>
			</Link>
			<div className="text-sm">
				<Link className="hover:underline" href={merchandiseUrl}>
					<h4 className="pb-2 font-bold tracking-wider">{item.merchandise.product.title}</h4>
				</Link>
				<ProductPrice
					className="pb-2 text-sm"
					price={item.merchandise.product.priceRange.maxVariantPrice}
				/>
				{!!Object.keys(merchandiseSearchParams).length &&
					item.merchandise.selectedOptions.map(selectedOption => (
						<p key={selectedOption.name}>
							<span className="font-bold">{selectedOption.name}</span> : {selectedOption.value}
						</p>
					))}
				<CartSectionItemQuantity className="mt-6 md:hidden" item={item} />
			</div>
		</td>
	);
}
