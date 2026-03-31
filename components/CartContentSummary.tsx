"use client";

import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";
import CartCheckout from "./CartCheckout";
import Price from "./Price";
import ShippingPolicyLink from "./ShippingPolicyLink";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
	className?: string;
};

export default function CartContentSummary({ cart, className }: Readonly<Props>) {
	const { closeModal } = useModal();

	return (
		<div className={cn(className)}>
			<div className="pb-2 text-sm font-bold">
				<div className="flex justify-between">
					<h3 className="tracking-wider">Total estimé</h3>
					<Price price={cart.cost.totalAmount} />
				</div>
				<ShippingPolicyLink onClick={closeModal} />
			</div>
			<CartCheckout />
		</div>
	);
}
