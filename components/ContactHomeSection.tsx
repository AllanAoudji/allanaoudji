import { cn } from "@/lib/utils";
import ContactContainer from "./ContactContainer";
import SubTitle from "./SubTitle";

type Props = {
	className?: string;
};

export default function ContactHomeSection({ className }: Readonly<Props>) {
	return (
		<section className={cn("vertical-padding", className)}>
			<div className="padding-container">
				<SubTitle className="pt-12">Contact</SubTitle>
				<ContactContainer />
			</div>
		</section>
	);
}
