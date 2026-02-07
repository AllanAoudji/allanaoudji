import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ProductRelatedContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("mt-8 border-t-2 pt-8 lg:mt-12 lg:border-0 lg:pt-0", className)}>
			<SubTitle className="pb-4">Vous aimerez peut-être...</SubTitle>
			{children}
		</section>
	);
}
