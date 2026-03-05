import ProductPrice from "./ProductPrice";
import CartItem from "@/types/cartItem";

type Props = {
	isPending: boolean;
	item: CartItem;
};

export default function CartSectionItemPrice({ isPending, item }: Readonly<Props>) {
	return (
		<td className="whitespace-nowrap">
			{isPending ? (
				<p>loading</p>
			) : (
				<ProductPrice className="font-bold" price={item.cost.totalAmount} />
			)}
		</td>
	);
}
