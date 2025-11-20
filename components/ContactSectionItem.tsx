import { cn } from "@/lib/utils";
import { contact } from "@/types/sanityType";

type Props = {
	className?: string;
	contact: contact;
};

export default function ContactSectionItem({ className, contact }: Readonly<Props>) {
	return (
		<li className={cn(className)}>
			<h3 className="text-lg uppercase">{contact.title}</h3>
			<a href={contact.url} target={contact.blank ? "_blank" : undefined}>
				{contact.text || contact.title}
			</a>
		</li>
	);
}
