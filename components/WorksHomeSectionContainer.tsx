import Grid from "./Grid";

type Props = {
	children: React.ReactNode;
};

export default function WorksHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<Grid tag="section" type="large" className="section-separator section-container">
			{children}
		</Grid>
	);
}
