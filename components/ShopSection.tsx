import Link from "next/link";
import SubTitle from "./SubTitle";

export default function ShopSection() {
	return (
		<section className="section-container section-separator text-center">
			<SubTitle className="pb-8">Nouveauté</SubTitle>
			<Link className="items-gap grid grid-cols-2 sm:grid-cols-4" href="/shop">
				<div className="bg-secondary aspect-3/4" />
				<div className="bg-secondary aspect-3/4" />
				<div className="bg-secondary aspect-3/4" />
				<div className="bg-secondary aspect-3/4" />
			</Link>
		</section>
	);
}
