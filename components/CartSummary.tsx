import { cn } from "@/lib/utils";
import CartCheckout from "./CartCheckout";
import ProductPrice from "./ProductPrice";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
	className?: string;
};

export default function CartSummary({ cart, className = "" }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<div>
				<h3>total items:</h3>
				<p>{cart.totalQuantity}</p>
				<h3>total cost:</h3>
				<ProductPrice price={cart.cost.totalAmount} />
			</div>
			<CartCheckout />
		</div>
	);
}
