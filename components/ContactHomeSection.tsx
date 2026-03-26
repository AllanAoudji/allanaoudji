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
			<div className="order-1 col-span-6 max-w-2xl lg:col-span-3 lg:col-start-4">
				<div className="border-b pb-2 text-lg leading-6">
					<p className="font-bold">On discute&nbsp;? Une idée de partenariat&nbsp;?</p>
					<p>Partage ton idée, ton feedback, ou juste pour dire bonjour&nbsp;😄</p>
				</div>
			</div>
			<div className="order-3 col-span-6 mt-24 flex lg:order-2 lg:col-span-3 lg:mt-0">
				<ul className="flex w-min flex-col">
					{query.contacts.map(contact => (
						<ContactHomeSectionItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
					))}
				</ul>
			</div>
			<ContactForm className="order-2 col-span-6 lg:order-3 lg:col-span-3" />
		</ContactHomeSectionContainer>
	);
}
