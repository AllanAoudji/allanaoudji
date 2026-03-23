import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ContactSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section
			className={cn(
				"vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary",
				className,
			)}
		>
			<div className="padding-container">
				<SubTitle className="py-12">Contact</SubTitle>
				{children}
			</div>
		</section>
	);
}
