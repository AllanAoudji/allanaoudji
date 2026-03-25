import { useState } from "react";
import { cn, contactFormSchema } from "@/lib/utils";

type Props = {
	id: keyof typeof contactFormSchema.shape;
	placeholder: string;
	title: string;
	error?: string;
	validateField: (_name: keyof typeof contactFormSchema.shape, _value: string) => boolean;
	onValueChange?: (_value: string) => void; // <-- nouveau
	type?: string;
	className?: string;
};

export default function ContactFormInput({
	id,
	placeholder,
	title,
	error,
	validateField,
	onValueChange,
	type,
	className,
}: Readonly<Props>) {
	const [showError, setShowError] = useState(false);

	const handleBlur = (value: string) => {
		const isValid = validateField(id, value);
		if (!showError) setShowError(!isValid);
	};

	const handleChange = (value: string) => {
		// remonte la valeur au parent à chaque frappe
		onValueChange?.(value);

		if (!showError) return; // showError pas encore déclenché
		validateField(id, value);
	};

	return (
		<div className={cn(className)}>
			<label
				htmlFor={id}
				className={cn("mb-0.5 block text-xs font-bold tracking-wider uppercase", {
					"text-danger": showError && error,
				})}
			>
				{title}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				onBlur={e => handleBlur(e.target.value)}
				onChange={e => handleChange(e.target.value)}
				aria-invalid={!!(showError && error)}
				aria-describedby={error ? `${id}-error` : undefined}
				className="border-quaternary focus:ring-quaternary w-full border px-2 py-2 transition focus:ring-2 focus:outline-none"
			/>
			<div className="mt-0.5 min-h-5">
				{showError && error && (
					<p id={`${id}-error`} className="text-danger text-right text-sm tracking-tighter">
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
