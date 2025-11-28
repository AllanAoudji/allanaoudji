"use client";

import { useActionState } from "react";
import removeItem from "@/lib/actions/removeItem";
import CartItem from "@/types/cartItem";
import UpdateCartType from "@/types/updateCartType";

type Props = {
	item: CartItem;
	optimisticUpdate: (_merchandiseId: string, _updateType: UpdateCartType) => void;
};

export default function CartItemDeleteButton({ item, optimisticUpdate }: Readonly<Props>) {
	const [message, formAction] = useActionState(removeItem, null);
	const merchandiseId = item.merchandise.id;
	const actionWithVariant = formAction.bind(null, merchandiseId);

	return (
		<form
			action={() => {
				optimisticUpdate(merchandiseId, "delete");
				actionWithVariant();
			}}
		>
			<button type="submit" aria-label="Remove cart item">
				<span>x</span>
			</button>
			<p aria-live="polite" className="sr-only" role="status">
				{message}
			</p>
		</form>
	);
}
