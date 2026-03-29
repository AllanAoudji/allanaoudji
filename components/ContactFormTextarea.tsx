import { useState } from "react";
import { cn, contactFormSchema } from "@/lib/utils";

type Props = {
	className?: string;
	error?: string;
	id: keyof typeof contactFormSchema.shape;
	placeholder: string;
	onValueChange?: (_value: string) => void; // <-- nouveau
	title: string;
	validateField: (_name: keyof typeof contactFormSchema.shape, _value: string) => boolean;
};

export default function ContactFormTextAra({
	className,
	error,
	id,
	onValueChange,
	placeholder,
	title,
	validateField,
}: Readonly<Props>) {
	const [showError, setShowError] = useState(false);

	const handleBlur = (value: string) => {
		const isValid = validateField(id, value);
		if (!showError) setShowError(!isValid);
	};

	const handleChange = (value: string) => {
		onValueChange?.(value); // remonte au parent

		if (!showError) return;
		validateField(id, value);
	};

	return (
		<div className={cn(className)}>
			<label
				className={cn("mb-0.5 block text-xs font-bold tracking-wider uppercase", {
					"text-danger": showError && error,
				})}
				htmlFor={id}
			>
				{title}
			</label>
			<textarea
				aria-describedby={error ? `${id}-error` : undefined}
				aria-invalid={!!(showError && error)}
				autoComplete="off"
				className="bordersecondary focus:ringsecondary block min-h-40 w-full resize-none border px-2 py-2 transition focus:ring-2 focus:outline-none"
				id={id}
				name={id}
				onBlur={e => handleBlur(e.target.value)}
				onChange={e => handleChange(e.target.value)}
				placeholder={placeholder}
			/>
			<div className="mt-0.5 min-h-5">
				{error && showError && (
					<p className="text-danger text-right text-sm tracking-tighter" id={`${id}-error`}>
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
