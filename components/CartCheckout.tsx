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
			<button type="submit" disabled={pending}>
				{pending ? "Processing..." : "Checkout"}
			</button>
			<p aria-label="polite" role="status">
				{message}
			</p>
		</form>
	);
}
