"use client";

import { useShopStatus } from "@/lib/hooks/useShopStatus";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function ShopDisabled({ className }: Readonly<Props>) {
	const { isEnabled } = useShopStatus();

	if (isEnabled) {
		return null;
	}

	return (
		<div className={cn(className)}>
			<p className="text-danger tracking-wide uppercase">🛍️ Boutique temporairement indisponible</p>
			<p className="text-sm">Les commandes rouvriront bientôt.</p>
		</div>
	);
}
