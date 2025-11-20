import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function InstagramSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="section-container section-separator">
			<SubTitle>Instagram</SubTitle>
			<Grid tag="a" href="https://www.instagram.com/allanaoudji/" target="_blank">
				{children}
			</Grid>
		</section>
	);
}
