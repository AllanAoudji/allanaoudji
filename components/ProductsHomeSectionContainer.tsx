import Link from "next/link";
import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ProductsHomeSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("vertical-padding", className)}>
			<div className="padding-container">
				<SubTitle className="text-primary">Nouveauté de la boutique</SubTitle>
				<Link className="block" href="/collections">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>
				</Link>
			</div>
		</section>
	);
}
