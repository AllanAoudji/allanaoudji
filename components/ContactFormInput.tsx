import { useState } from "react";
import { CONTACT_FORM_SCHEMA } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
	autoComplete?: string;
	className?: string;
	error?: string;
	id: keyof typeof CONTACT_FORM_SCHEMA.shape;
	onValueChange?: (_value: string) => void;
	placeholder: string;
	title: string;
	validateField: (_name: keyof typeof CONTACT_FORM_SCHEMA.shape, _value: string) => boolean;
	type?: string;
};

export default function ContactFormInput({
	autoComplete = "on",
	className,
	error,
	id,
	onValueChange,
	placeholder,
	title,
	validateField,
	type,
}: Readonly<Props>) {
	const [showError, setShowError] = useState(false);

	const handleBlur = (value: string) => {
		const isValid = validateField(id, value);
		if (!showError) setShowError(!isValid);
	};

	const handleChange = (value: string) => {
		onValueChange?.(value);

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
			<input
				aria-describedby={error ? `${id}-error` : undefined}
				aria-invalid={!!(showError && error)}
				autoComplete={autoComplete}
				className="w-full border border-inherit px-2 py-2 transition focus:ring-2 focus:ring-inherit focus:outline-none"
				id={id}
				name={id}
				onBlur={e => handleBlur(e.target.value)}
				onChange={e => handleChange(e.target.value)}
				placeholder={placeholder}
				type={type}
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
