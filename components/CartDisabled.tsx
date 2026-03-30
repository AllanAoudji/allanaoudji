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
			<div className={"border-danger border px-8 py-2 text-center"}>
				<p className="text-danger uppercase">🛍️ Boutique temporairement indisponible</p>
				<p className="text-xs">Les commandes rouvriront bientôt.</p>
			</div>
		</div>
	);
}
