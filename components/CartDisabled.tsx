"use client";

import { useShopStatus } from "@/lib/hooks/useShopStatus";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CartDisabled({ className }: Readonly<Props>) {
	const { isEnabled } = useShopStatus();

	if (isEnabled) {
		return null;
	}

	return (
		<div className={cn(className)}>
			<div className={"border-danger border-2 p-4"}>
				<p className="text-danger text-sm font-bold">🛍️ Boutique temporairement indisponible</p>
				<p className="text-xs">Les commandes rouvriront bientôt.</p>
			</div>
		</div>
	);
}
