"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	disabled: boolean;
};

export default function ContactFormSubmitButton({ className, disabled }: Readonly<Props>) {
	const { pending } = useFormStatus();

	const buttonText = () => {
		let buttonLabel = "Envoyer";
		if (pending) buttonLabel = "Envoi...";
		else if (disabled) buttonLabel = "Formulaire incomplet";

		return buttonLabel;
	};

	return (
		<button
			disabled={pending || disabled}
			className={cn(
				"bg-secondary text-primary w-full border border-inherit px-4 py-2 tracking-wide uppercase transition",
				{
					"hover:bg-primary hover:text-secondary cursor-pointer": !disabled,
					"cursor-progress": pending,
					"cursor-not-allowed": disabled,
					"bg-secondary/75": disabled,
				},
				className,
			)}
			type="submit"
		>
			{buttonText()}
		</button>
	);
}
