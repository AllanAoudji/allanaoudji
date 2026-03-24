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
			<ul className="flex w-min flex-col">
				{query.contacts.map(contact => (
					<ContactHomeSectionItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
				))}
			</ul>
		</ContactHomeSectionContainer>
	);
}
