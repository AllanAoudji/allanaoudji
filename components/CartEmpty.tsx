import Link from "next/link";
import SubTitle from "./SubTitle";

export default function CartEmpty() {
	return (
		<section className="pt-12">
			<SubTitle className="mb-8 border-b-2 pb-4">Votre panier est vide</SubTitle>
			<div className="flex">
				<Link href="/collections" className="block rounded-xl border-2 px-4 py-2">
					Visitez ma boutique
				</Link>
			</div>
		</section>
	);
}
