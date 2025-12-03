import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function WorksHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="padding-container section-container">
			<SubTitle className="mb-12 text-center">Découvrire mon travail</SubTitle>
			<Grid type="large">{children}</Grid>
		</section>
	);
}
