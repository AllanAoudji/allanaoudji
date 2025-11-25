import { CartSectionItem } from "./CartSectionItem";
import ProductPrice from "./ProductPrice";
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
			<div>
				<h3>total items:</h3>
				<p>{cart.totalQuantity}</p>
				<h3>total cost:</h3>
				<ProductPrice price={cart.cost.totalAmount} />
			</div>
			{/* <form action={redirectToCheckout}>
				<CartCheckoutButton />
			</form> */}
		</section>
	);
}
