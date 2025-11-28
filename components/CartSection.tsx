import { CartSectionItem } from "./CartSectionItem";
import CartSummary from "./CartSummary";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
};

export default function CartSection({ cart }: Readonly<Props>) {
	return (
		<section>
			<ul className="flex flex-col gap-8">
				{cart.lines
					.sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
					.map(line => (
						<CartSectionItem key={line.merchandise.id} item={line} />
					))}
			</ul>
			<CartSummary cart={cart} />
		</section>
	);
}
