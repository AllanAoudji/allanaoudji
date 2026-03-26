import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ContactHomeSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section
			className={cn(
				"vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary",
				className,
			)}
		>
			<div className="padding-container">
				<SubTitle className="py-12">Contact</SubTitle>
				<div className="grid grid-cols-6 gap-4">{children}</div>
			</div>
		</section>
	);
}
