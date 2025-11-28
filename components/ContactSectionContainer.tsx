import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ContactSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("section-container", className)}>
			<SubTitle className="pb-16">Contact</SubTitle>
			{children}
		</section>
	);
}
