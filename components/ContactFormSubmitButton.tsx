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
				"bg-quaternary text-primary border-quaternary w-full border px-4 py-2 tracking-wide uppercase transition",
				{
					"hover:bg-primary hover:text-quaternary cursor-pointer": !disabled,
					"cursor-progress": pending,
					"bg-quaternary/75": disabled,
				},
				className,
			)}
		>
			{buttonLabel}
		</button>
	);
}
