"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { getFreeShippingThreshold } from "@/lib/util-discount";
import { cn } from "@/lib/utils";
import Price from "./Price";

type Props = {
	className?: string;
};

const PERMANENT_THRESHOLD = {
	amount: process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD,
	currencyCode: process.env.NEXT_PUBLIC_FREE_SHIPPING_CURRENCY,
};

export default function FreeDelivery({ className }: Readonly<Props>) {
	const { discountNode } = useLocalShopify();

	const promotional = getFreeShippingThreshold(discountNode);

	const threshold = (() => {
		if (!promotional) return PERMANENT_THRESHOLD;

		// Toujours afficher le seuil le plus bas (le plus avantageux)
		return parseFloat(promotional.amount) < parseFloat(PERMANENT_THRESHOLD.amount)
			? promotional
			: PERMANENT_THRESHOLD;
	})();

	return (
		<div className={cn("text-xs", className)}>
			<p>
				Livraison gratuite en France métropolitaine dès <Price price={threshold} />.
			</p>
		</div>
	);
}
