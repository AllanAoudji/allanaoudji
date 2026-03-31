import * as Sentry from "@sentry/nextjs";
import ContactLinksItem from "./ContactLinksItem";
import { getContacts } from "@/studio/lib/queries";

export default async function ContactLinks() {
	let result;
	try {
		result = await getContacts();
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "Failed to fetch contacts" },
		});
		return null; // silencieux, pas de throw
	}

	if (!result || !result.data || result.data.length === 0) {
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
