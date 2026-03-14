"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { redirectToCheckout } from "@/lib/actions/redirectToCheckout";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CartCheckout({ className = "" }: Readonly<Props>) {
	const [message, formAction] = useActionState(redirectToCheckout, null);
	const { pending } = useFormStatus();

	return (
		<form action={formAction} className={cn("bg-red-400", className)}>
			<button
				className={cn(
					"bg-quaternary border-qua text-primary hover:bg-primary hover:text-quaternary block w-full border px-8 py-3 text-center tracking-wider uppercase transition-colors",

					{
						"cursor-not-allowed": pending,
					},
				)}
				disabled={pending}
				type="submit"
			>
				{pending ? "Processing..." : "Procéder au paiement"}
			</button>
			<p aria-label="polite" role="status">
				{message}
			</p>
		</form>
	);
}
