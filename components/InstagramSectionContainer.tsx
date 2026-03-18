import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function InstagramSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="vertical-padding bg-quaternary text-primary">
			<div className="padding-container">
				<SubTitle>Instagram</SubTitle>
				<a className="block" href="https://www.instagram.com/allanaoudji/" target="_blank">
					<Grid type="smallest">{children}</Grid>
				</a>
			</div>
		</section>
	);
}
