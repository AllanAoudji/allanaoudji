import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ProductRelatedContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("mt-12 border-t-2 pt-4", className)}>
			<SubTitle className="pb-4">Related products:</SubTitle>
			{children}
		</section>
	);
}
