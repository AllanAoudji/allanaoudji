import Link from "next/link";
import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function ProductsHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="vertical-padding bg-quaternary">
			<div className="padding-container">
				<SubTitle className="text-primary">Nouveauté de la boutique</SubTitle>
				<Link className="block" href="/collections">
					<Grid className="md:grid-cols-4">{children}</Grid>
				</Link>
			</div>
		</section>
	);
}
