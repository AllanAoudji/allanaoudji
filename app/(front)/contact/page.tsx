import type { Metadata } from "next";
import { DEFAULT_OG } from "@/lib/constants";
import ContactContainer from "@/components/ContactContainer";

export const metadata: Metadata = {
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
	},
	description:
		"Contactez Allan Aoudji pour toute demande de collaboration, commande ou renseignement.",
	openGraph: {
		...DEFAULT_OG,
		title: "Contact | Allan Aoudji",
	},
	title: "Contact",
};

export default function ContactPage() {
	return <ContactContainer />;
}
