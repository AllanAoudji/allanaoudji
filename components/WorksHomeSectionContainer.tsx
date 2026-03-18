import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function WorksHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="padding-container vertical-padding">
			<SubTitle className="">Découvrire mon travail</SubTitle>
			<Grid type="large">{children}</Grid>
		</section>
	);
}
