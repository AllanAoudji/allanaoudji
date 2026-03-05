"use client";

import { useMemo } from "react";
import { useCartForm } from "@/lib/contexts/cartForm-context";
import CartSectionItemPrice from "./CartSectionItemPrice";
import CartSectionItemProduct from "./CartSectionItemProduct";
import CartSectionItemQuantity from "./CartSectionItemQuantity";
import CartSectionItemQuantityContainer from "./CartSectionItemQuantityContainer";
import CartItem from "@/types/cartItem";

type Props = {
	item: CartItem;
};

export function CartSectionItem({ item }: Readonly<Props>) {
	const { productPending } = useCartForm();

	const isPending = useMemo(() => {
		return (
			!!productPending && productPending.type === "UPDATE" && productPending.id === item.merchandise.id
		);
	}, [item, productPending]);

	console.log(productPending?.type);

	return (
		<tr key={item.merchandise.id} className="hover:bg-secondary border-t last:border-b">
			<CartSectionItemProduct item={item} />
			<CartSectionItemQuantityContainer>
				<CartSectionItemQuantity item={item} />
			</CartSectionItemQuantityContainer>
			<CartSectionItemPrice isPending={isPending} item={item} />
		</tr>
	);
}
