import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionItem from "./ContactSectionItem";
import { getContacts } from "@/sanity/lib/queries";

export default async function ContactSection() {
	const query = await getContacts();

	if (!query || !query.contacts || query.contacts.length === 0) {
		return null;
	}

	return (
		<ContactSectionContainer>
			<ul className="flex w-min flex-col">
				{query.contacts.map(contact => (
					<ContactSectionItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
				))}
			</ul>
		</ContactSectionContainer>
	);
}
