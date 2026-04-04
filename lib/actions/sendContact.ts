"use server";

import { ContactFormFields, ERROR_CODE, SPAM_WORDS_FR } from "../constants";
import { checkRateLimit } from "../redis";
import * as Sentry from "@sentry/nextjs";
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const schema = z.object({
	email: z.string().email(),
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	message: z.string().min(10).max(2000),
	subject: z.string().min(3).max(120),
	website: z.string().optional(),
});

function getFormValue<T extends string>(formData: FormData, key: T): string {
	const value = formData.get(key);

	if (typeof value !== "string") {
		return "";
	}

	return escapeHtml(value);
}

export default async function sendContact(formData: FormData) {
	const data = {
		email: getFormValue<ContactFormFields>(formData, "email"),
		firstName: getFormValue<ContactFormFields>(formData, "firstName"),
		lastName: getFormValue<ContactFormFields>(formData, "lastName"),
		message: getFormValue<ContactFormFields>(formData, "message"),
		subject: getFormValue<ContactFormFields>(formData, "subject"),
		website: getFormValue<ContactFormFields>(formData, "website"),
	};
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		return ERROR_CODE.INVALID_FORM_DATA;
	}

	if (data.website) {
		return ERROR_CODE.INVALID_FORM_DATA;
	}

	const ip = (await headers()).get("x-forwarded-for") || "unknown";

	await checkRateLimit(ip);

	if (SPAM_WORDS_FR.some(w => (data.message as string).toLowerCase().includes(w))) {
		return ERROR_CODE.INVALID_FORM_DATA;
	}

	try {
		await resend.emails.send({
			from: process.env.FROM_EMAIL,
			to: process.env.CONTACT_EMAIL,
			replyTo: data.email,
			subject: `Contact: ${data.subject}`,
			text: `
	Nouveau message de contact
	
	Nom   : ${data.firstName} ${data.lastName}
	Email : ${data.email}
	Sujet : ${data.subject}
	
	Message :
	${data.message}
	
	Site : allanaoudji.com
	  `,
			html: `
	  <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
		<h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">
		  Nouveau message de contact
		</h2>
	
		<p><strong>Nom :</strong> ${data.firstName} ${data.lastName}<br>
		<strong>Email :</strong> ${data.email}<br>
		<strong>Sujet :</strong> ${data.subject}</p>
	
		<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 12px 0;" />
	
		<p><strong>Message :</strong></p>
		<p style="background-color: #f3f4f6; padding: 8px 12px; border-radius: 4px; white-space: pre-wrap;">
		  ${data.message}
		</p>
	
		<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 12px 0;" />
	
		<p style="font-size: 0.9em; color: #6b7280;">
		  🌐 Site : allanaoudji.com
		</p>
	  </div>
	  `,
		});
	} catch (error) {
		Sentry.captureException(error, {
			extra: {
				context: "Failed to send contact email via Resend",
				subject: data.subject,
				from: data.email,
			},
		});
		return ERROR_CODE.EMAIL_FAILED;
	}
}
