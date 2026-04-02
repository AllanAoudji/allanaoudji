"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { redirectToCheckout } from "@/lib/actions/redirectToCheckout";
import { useShopStatus } from "@/lib/hooks/useShopStatus";
import { cn, formatErrorMessage } from "@/lib/utils";

type Props = {
	className?: string;
};

function CheckoutButton({ isEnabled }: { isEnabled: boolean }) {
	const { pending } = useFormStatus();

	const label = pending
		? "Processing..."
		: !isEnabled
			? "Boutique temporairement indisponible"
			: "Procéder au paiement";

	return (
		<button
			className={cn("CTA", {
				"cursor-progress!": pending,
				"bg-secondary/75! text-primary! cursor-not-allowed!": !isEnabled,
			})}
			disabled={pending || !isEnabled}
			type="submit"
		>
			{label}
		</button>
	);
}

export default function CartCheckout({ className = "" }: Readonly<Props>) {
	const { isEnabled } = useShopStatus();
	const [message, formAction] = useActionState(redirectToCheckout, null);

	return (
		<form action={formAction} className={cn(className)}>
			<CheckoutButton isEnabled={isEnabled} />
			{message && (
				<p aria-label="polite" role="status">
					{formatErrorMessage(message)}
				</p>
			)}
		</form>
	);
}
