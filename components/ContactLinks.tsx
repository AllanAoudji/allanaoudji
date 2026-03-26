import ContactLinksItem from "./ContactLinksItem";
import { getContacts } from "@/sanity/lib/queries";

export default async function ContactLinks() {
	const query = await getContacts();

	if (!query || !query.contacts || query.contacts.length === 0) {
		return null;
	}

	return (
		<ul className="flex w-min flex-col">
			{query.contacts.map(contact => (
				<ContactLinksItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
			))}
		</ul>
	);
}
