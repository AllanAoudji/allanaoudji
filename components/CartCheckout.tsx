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
		<form action={formAction} className={cn(className)}>
			<button
				className={cn(
					"bg-quaternary text-primary hover:bg-primary hover:text-quaternary w-80 cursor-pointer border px-4 py-3 font-bold tracking-wider transition",
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
