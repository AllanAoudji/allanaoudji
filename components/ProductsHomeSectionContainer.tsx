import Link from "next/link";
import { cn } from "@/lib/utils";
import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ProductsHomeSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section
			className={cn(
				"vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary",
				className,
			)}
		>
			<div className="padding-container">
				<SubTitle className="text-primary">Nouveauté de la boutique</SubTitle>
				<Link className="block" href="/collections">
					<Grid className="md:grid-cols-4">{children}</Grid>
				</Link>
			</div>
		</section>
	);
}
