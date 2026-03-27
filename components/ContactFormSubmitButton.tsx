"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	disabled: boolean;
};

export default function ContactFormSubmitButton({ className, disabled }: Readonly<Props>) {
	const { pending } = useFormStatus();

	let buttonLabel = "Envoyer";
	if (pending) buttonLabel = "Envoi...";
	else if (disabled) buttonLabel = "Formulaire incomplet";

	return (
		<button
			type="submit"
			disabled={pending || disabled}
			className={cn(
				"bg-secondary text-primary border-secondary w-full border px-4 py-2 tracking-wide uppercase transition",
				{
					"hover:bg-primary hover:text-secondary cursor-pointer": !disabled,
					"cursor-progress": pending,
					"bg-secondary/75": disabled,
				},
				className,
			)}
		>
			{buttonLabel}
		</button>
	);
}
