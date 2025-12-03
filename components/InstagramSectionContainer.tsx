import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function InstagramSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="section-container section-separator bg-quaternary text-primary">
			<div className="padding-container">
				<SubTitle className="mb-12 text-center">Instagram</SubTitle>
				<a className="block" href="https://www.instagram.com/allanaoudji/" target="_blank">
					<Grid>{children}</Grid>
				</a>
			</div>
		</section>
	);
}
