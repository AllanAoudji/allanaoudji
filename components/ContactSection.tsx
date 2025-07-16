import ContactSectionItem from "./ContactSectionItem";
import SubTitle from "./SubTitle";
import { getContact } from "@/.sanity/lib/queries";

export default async function ContactSection() {
	const query = await getContact();

	if (!query.contacts || query.contacts.length === 0) {
		return null;
	}

	return (
		<section className="section-container">
			<SubTitle className="pb-16">Contact</SubTitle>
			<ul className="items-gap grid-default">
				{query.contacts.map(contact => (
					<ContactSectionItem contact={contact} key={contact._id} />
				))}
			</ul>
		</section>
	);
}
