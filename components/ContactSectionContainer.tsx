import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ContactSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("section-container padding-container", className)}>
			<SubTitle className="py-16">Contact</SubTitle>
			{children}
		</section>
	);
}
