import CartContentItem from "./CartContentItem";
import CartContentSummary from "./CartContentSummary";
import CartHeader from "./CartHeader";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
};

export default function CartContent({ cart }: Readonly<Props>) {
	return (
		<div className="flex h-screen flex-col">
			<CartHeader />
			<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-8">
				{cart.lines
					.sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
					.map(line => (
						<CartContentItem item={line} key={line.id} />
					))}
			</div>
			<CartContentSummary cart={cart} className="px-4 pt-2 pb-4" />
		</div>
	);
}
