import { cn } from "@/lib/utils";
import { contact } from "@/types/sanityType";

type Props = {
	className?: string;
	contact: contact;
};

export default function ContactHomeSectionItem({ className, contact }: Readonly<Props>) {
	return (
		<li className={cn("flex flex-col pb-4 last-of-type:pb-0", className)}>
			<h3 className="block text-xl font-bold uppercase">{contact.title}</h3>
			<a
				className={cn(
					"nav-hover flex text-xl italic",
					"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
				)}
				href={contact.url}
				target={contact.blank ? "_blank" : undefined}
			>
				<span
					className={cn(
						"relative pb-0.5",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
					)}
				>
					{contact.text || contact.title}
				</span>
			</a>
		</li>
	);
}
