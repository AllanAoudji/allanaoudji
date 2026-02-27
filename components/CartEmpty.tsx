import Link from "next/link";
import Title from "./Title";

export default function CartEmpty() {
	return (
		<section>
			<Title>Votre panier est vide</Title>
			<div className="vertical-padding flex">
				<Link
					href="/collections"
					className="bg-quaternary text-primary hover:bg-primary hover:text-quaternary block border-4 px-8 py-4 text-lg font-bold tracking-wider uppercase transition-colors"
				>
					Continuez les achats
				</Link>
			</div>
		</section>
	);
}
