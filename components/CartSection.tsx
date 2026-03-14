import CartHeader from "./CartHeader";
import CartSectionItem from "./CartSectionItem";
import CartSummary from "./CartSummary";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
};

export default function CartSection({ cart }: Readonly<Props>) {
	return (
		<div className="flex h-screen flex-col">
			<CartHeader />
			<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-8">
				{cart.lines
					.sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
					.map(line => (
						<CartSectionItem item={line} key={line.id} />
					))}
			</div>
			<CartSummary cart={cart} className="px-4 pt-2 pb-4" />
		</div>
	);
}
