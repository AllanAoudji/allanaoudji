"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { redirectToCheckout } from "@/lib/actions/redirectToCheckout";
import { useShopStatus } from "@/lib/hooks/useShopStatus";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CartCheckout({ className = "" }: Readonly<Props>) {
	const { isEnabled } = useShopStatus();

	const [message, formAction] = useActionState(redirectToCheckout, null);
	const { pending } = useFormStatus();

	console.log(isEnabled);

	const checkoutMessage = () => {
		if (pending) {
			return "Processing...";
		}
		if (!isEnabled) {
			return "Boutique temporairement indisponible";
		}
		return "Procéder au paiement";
	};

	return (
		<form action={formAction} className={cn(className)}>
			<button
				className={cn(
					"CTA",

					{
						"cursor-progress!": pending,
						"bg-secondary/75! text-primary! cursor-not-allowed!": !isEnabled,
					},
				)}
				disabled={pending || !isEnabled}
				type="submit"
			>
				{checkoutMessage()}
			</button>
			<p aria-label="polite" role="status">
				{message}
			</p>
		</form>
	);
}
