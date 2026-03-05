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
		<div className={cn("mt-16", className)}>
			<div>
				<div className="flex justify-center gap-4 pb-1 text-sm md:justify-end">
					<h3 className="font-bold tracking-wider">Nombre de produits</h3>
					<p>{cart.totalQuantity}</p>
				</div>
				<div className="flex justify-center gap-4 md:justify-end">
					<h3 className="text-lg font-bold tracking-wider">Total estimé</h3>
					<ProductPrice className="text-xl" price={cart.cost.totalAmount} />
				</div>
			</div>
			<CartCheckout className="mt-8 flex justify-center md:justify-end" />
		</div>
	);
}
