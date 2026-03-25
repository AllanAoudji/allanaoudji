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
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 md:col-span-1">
						<SubTitle className="mb-0">Une question ? Une remarque ? Contactez-moi.</SubTitle>
					</div>
					{children}
				</div>
			</div>
		</section>
	);
}
