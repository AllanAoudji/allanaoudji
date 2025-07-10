import SubTitle from "./SubTitle";

export default function InstagramSection() {
	return (
		<section className="section-container section-separator">
			<SubTitle>Instagram</SubTitle>
			<a
				className="items-gap grid-default pt-5"
				href="https://www.instagram.com/allanaoudji/"
				target="_blank"
			>
				<div className="bg-secondary aspect-3/4" />
				<div className="bg-secondary aspect-3/4" />
				<div className="bg-secondary aspect-3/4" />
				<div className="bg-secondary aspect-3/4" />
			</a>
		</section>
	);
}
