import ContactLinksItem from "./ContactLinksItem";
import { getContacts } from "@/sanity/lib/queries";

export default async function ContactLinks() {
	const result = await getContacts();

	if (!result || !result.data || !result.data.contacts || result.data.contacts.length === 0) {
		return null;
	}

	return (
		<ul className="flex w-min flex-col">
			{result.data.contacts.map(contact => (
				<ContactLinksItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
			))}
		</ul>
	);
}
