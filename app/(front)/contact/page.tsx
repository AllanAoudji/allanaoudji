import type { Metadata } from "next";
import ContactContainer from "@/components/ContactContainer";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Contactez Allan Aoudji pour toute demande de collaboration, commande ou renseignement.",
	openGraph: {
		title: "Contact | Allan Aoudji",
		type: "website",
		url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
	},
};

export default function Contact() {
	return <ContactContainer />;
}
