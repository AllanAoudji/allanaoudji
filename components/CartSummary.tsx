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
			<div className="pb-4 text-sm font-bold">
				<div className="flex justify-between">
					<h3 className="tracking-wider">Total estimé</h3>
					<ProductPrice price={cart.cost.totalAmount} />
				</div>
			</div>
			<CartCheckout />
		</div>
	);
}
