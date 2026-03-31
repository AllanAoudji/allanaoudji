import type { Metadata } from "next";
import ContactContainer from "@/components/ContactContainer";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
	},
	description:
		"Contactez Allan Aoudji pour toute demande de collaboration, commande ou renseignement.",
	openGraph: {
		title: "Contact | Allan Aoudji",
		type: "website",
		url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
	},
	title: "Contact",
};

export default function ContactPage() {
	return <ContactContainer />;
}
