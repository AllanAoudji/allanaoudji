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
				<ContactLinksItem className={"last-of-type:pb-6"} contact={contact} key={contact._id} />
			))}
		</ul>
	);
}
