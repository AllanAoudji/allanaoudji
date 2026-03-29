import ContactLinksItem from "./ContactLinksItem";
import { getContacts } from "@/studio/lib/queries";

export default async function ContactLinks() {
	const result = await getContacts();

	if (!result || !result.data || !result.data || result.data.length === 0) {
		return null;
	}

	return (
		<ul className="flex w-min flex-col">
			{result.data.map(contact => (
				<ContactLinksItem key={contact._id} contact={contact} className={"last-of-type:pb-6"} />
			))}
		</ul>
	);
}
