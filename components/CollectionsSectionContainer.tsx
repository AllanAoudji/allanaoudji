import { cn } from "@/lib/utils";
import Title from "./Title";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function CollectionsSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("vertical-padding", className)}>
			<Title>Collections</Title>
			{children}
		</section>
	);
}
