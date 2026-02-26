import Link from "next/link";
import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function ProductsHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="vertical-padding bg-quaternary text-center">
			<div className="padding-container">
				<SubTitle className="text-primary mb-12">🔥 Nouveauté de la boutique 🔥</SubTitle>
				<Link className="block pb-8" href="/collections">
					<Grid>{children}</Grid>
				</Link>
			</div>
		</section>
	);
}
