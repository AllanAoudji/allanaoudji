import { cn } from "@/lib/utils";
import { contact } from "@/types/sanityType";

type Props = {
	className?: string;
	contact: contact;
};

export default function ContactSectionItem({ className, contact }: Readonly<Props>) {
	return (
		<div className={cn(className)}>
			<h3 className="text-xl font-bold tracking-widest uppercase">{contact.title}</h3>
			<a
				className="nav-hover animation text-xl italic"
				href={contact.url}
				target={contact.blank ? "_blank" : undefined}
			>
				{contact.text || contact.title}
			</a>
		</div>
	);
}
