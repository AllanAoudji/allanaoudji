import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ProductRelatedContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("mt-8 border-t pt-8 md:border-0 md:pt-0 lg:mt-12", className)}>
			<SubTitle className="pb-4">Vous aimerez peut-être...</SubTitle>
			{children}
		</section>
	);
}
