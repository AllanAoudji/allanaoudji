import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function WorksHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary">
			<div className="padding-container">
				<SubTitle className="">Découvrire mon travail</SubTitle>
				<Grid type="large">{children}</Grid>
			</div>
		</section>
	);
}
