import ContactForm from "./ContactForm";
import ContactHomeSectionContainer from "./ContactHomeSectionContainer";
import ContactHomeSectionItem from "./ContactHomeSectionItem";
import { getContacts } from "@/sanity/lib/queries";

export default async function ContactHomeSection() {
	const query = await getContacts();

	if (!query || !query.contacts || query.contacts.length === 0) {
		return null;
	}

	return (
		<ContactHomeSectionContainer>
			<ContactForm className="col-span-2 md:col-span-1 md:col-start-1" />
			<ul className="col-span-2 flex w-min flex-col md:col-span-1">
				{query.contacts.map(contact => (
					<ContactHomeSectionItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
				))}
			</ul>
		</ContactHomeSectionContainer>
	);
}
