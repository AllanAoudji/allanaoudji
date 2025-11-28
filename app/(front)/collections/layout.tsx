import Filter from "@/components/Filter";
import Grid from "@/components/Grid";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<>
			<Title>boutique</Title>
			<Grid tag="section" className="section-container" type="small">
				<div className="col-span-1">
					<Filter className="pb-4" type="collections" />
					<Filter type="ordering" />
				</div>
				{children}
			</Grid>
		</>
	);
}
