import { cn } from "@/lib/utils";
import Title from "./Title";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function CollectionsSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("section-container", className)}>
			<Title>Collections</Title>
			{children}
		</section>
	);
}
