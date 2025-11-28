import Link from "next/link";
import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function ProductsHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="section-container section-separator text-center">
			<SubTitle className="pb-8">Nouveauté de la boutique</SubTitle>
			<Link className="block" href="/collections">
				<Grid>{children}</Grid>
			</Link>
		</section>
	);
}
