import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ProductRelatedContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("mt-16 lg:mt-12", className)}>
			<SubTitle>Vous aimerez peut-être...</SubTitle>
			{children}
		</section>
	);
}
