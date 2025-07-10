import SubTitle from "./SubTitle";

export default function InstagramSection() {
	return (
		<section className="section-container section-separator">
			<SubTitle>Instagram</SubTitle>
			<a
				className="items-gap grid grid-cols-2 pt-5 sm:grid-cols-4"
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
