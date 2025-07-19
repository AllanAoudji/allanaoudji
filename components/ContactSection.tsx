import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionItem from "./ContactSectionItem";
import { getContacts } from "@/sanity/lib/queries";
import { CONTACTS_QUERYResult } from "@/sanity/types";

export default async function ContactSection() {
	let query: CONTACTS_QUERYResult;
	try {
		query = await getContacts();
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!query || !query.contacts || query.contacts.length === 0) {
		return null;
	}

	return (
		<ContactSectionContainer>
			<ul className="items-gap grid-default">
				{query.contacts.map(contact => (
					<ContactSectionItem key={contact._id} contact={contact} />
				))}
			</ul>
		</ContactSectionContainer>
	);
}
