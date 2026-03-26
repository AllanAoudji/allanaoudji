"use client";

import Form from "next/form";
import { useState, useEffect } from "react";
import { z } from "zod";
import sendContact from "@/lib/actions/sendContact";
import { cn, contactFormSchema } from "@/lib/utils";
import ContactFormCallbackMessage from "./ContactFormCallbackMessage";
import ContactFormInput from "./ContactFormInput";
import ContactFormSubmitButton from "./ContactFormSubmitButton";
import ContactFormTextAra from "./ContactFormTextarea";

type FormErrors = Partial<Record<keyof z.infer<typeof contactFormSchema>, string>>;

type Props = {
	className?: string;
};

export default function ContactForm({ className }: Readonly<Props>) {
	const [callbackMessage, setCallbackMessage] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isDisabled, setIsDisabled] = useState(true);
	const [values, setValues] = useState<Record<string, string>>({});

	// Validation d’un champ unique
	const validateField = (name: keyof typeof contactFormSchema.shape, value: string) => {
		const fieldSchema = contactFormSchema.shape[name];
		let isValid = true;
		try {
			fieldSchema.parse(value);
			setErrors(prev => ({ ...prev, [name]: undefined }));
		} catch (err) {
			isValid = false;
			if (err instanceof z.ZodError) {
				setErrors(prev => ({ ...prev, [name]: err.errors[0].message }));
			}
		}

		return isValid;
	};

	const handleSubmit = async (formData: FormData) => {
		const data = Object.fromEntries(formData.entries());
		const parsed = contactFormSchema.safeParse(data);

		if (!parsed.success) {
			const fieldErrors: FormErrors = {};
			parsed.error.errors.forEach(e => {
				if (e.path[0]) fieldErrors[e.path[0] as keyof FormErrors] = e.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		try {
			await sendContact(formData);
			setCallbackMessage({
				message: "Merci, ton message a été envoyé !",
				type: "success",
			});
			setValues({}); // reset values
		} catch (err) {
			setCallbackMessage({
				message: err instanceof Error ? err.message : "Erreur lors de l’envoi",
				type: "error",
			});
		}
	};

	// Mettre à jour le disabled du bouton
	useEffect(() => {
		const hasErrors = Object.values(errors).some(Boolean);
		const hasEmpty = ["firstName", "lastName", "email", "subject", "message"].some(
			key => !values[key] || values[key].trim() === "",
		);

		const nextDisabled = hasErrors || hasEmpty;

		setIsDisabled(prev => (prev === nextDisabled ? prev : nextDisabled));
	}, [errors, values]);

	useEffect(() => {
		return () => {
			setCallbackMessage(null);
		};
	}, []);

	return (
		<div className={cn("w-full max-w-xl", className)}>
			<Form action={handleSubmit}>
				<input autoComplete="off" className="hidden" name="website" tabIndex={-1} />

				<div className="grid gap-0 lg:grid-cols-2 lg:gap-4">
					<ContactFormInput
						error={errors.firstName}
						id="firstName"
						onValueChange={val => setValues(prev => ({ ...prev, firstName: val }))}
						placeholder="Ton prénom"
						title="Prénom"
						validateField={validateField}
					/>

					<ContactFormInput
						error={errors.lastName}
						id="lastName"
						onValueChange={val => setValues(prev => ({ ...prev, lastName: val }))}
						placeholder="Ton nom"
						title="Nom"
						validateField={validateField}
					/>
				</div>

				<ContactFormInput
					error={errors.email}
					id="email"
					onValueChange={val => setValues(prev => ({ ...prev, email: val }))}
					placeholder="Ton email"
					title="Email"
					validateField={validateField}
					type="email"
				/>

				<ContactFormInput
					error={errors.subject}
					id="subject"
					onValueChange={val => setValues(prev => ({ ...prev, subject: val }))}
					placeholder="Sujet"
					title="Sujet"
					validateField={validateField}
				/>

				<ContactFormTextAra
					className="mb-2"
					error={errors.message}
					id="message"
					onValueChange={val => setValues(prev => ({ ...prev, message: val }))}
					placeholder="Ton message..."
					title="Message"
					validateField={validateField}
				/>

				<ContactFormSubmitButton disabled={isDisabled} />
			</Form>
			<ContactFormCallbackMessage callbackMessage={callbackMessage} className="mt-2" />
		</div>
	);
}
