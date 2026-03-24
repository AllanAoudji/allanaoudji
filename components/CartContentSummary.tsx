import { cn } from "@/lib/utils";
import CartCheckout from "./CartCheckout";
import Price from "./Price";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
	className?: string;
};

export default function CartContentSummary({ cart, className = "" }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<div className="pb-4 text-sm font-bold">
				<div className="flex justify-between">
					<h3 className="tracking-wider">Total estimé</h3>
					<Price price={cart.cost.totalAmount} />
				</div>
			</div>
			<CartCheckout />
		</div>
	);
}
