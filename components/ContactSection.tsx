import ContactSectionItem from "./ContactSectionItem";
import SubTitle from "./SubTitle";
import CONTACTS from "@/utils/contacts";

export default function ContactSection() {
	return (
		<section className="section-container">
			<SubTitle className="pb-16">Contact</SubTitle>
			<ul className="items-gap grid-default">
				{CONTACTS.map(contact => (
					<ContactSectionItem
						href={contact.href}
						key={contact.id}
						target={contact.target}
						text={contact.text}
						title={contact.title}
					/>
				))}
			</ul>
		</section>
	);
}
