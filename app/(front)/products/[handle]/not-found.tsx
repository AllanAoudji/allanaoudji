import Link from "next/link";
import Title from "@/components/Title";

export default function ProductNotFound() {
	return (
		<div className="vertical-padding padding-container">
			<Title>Produit introuvable</Title>
			<p className="text-sm tracking-widest uppercase opacity-40">erreur 404</p>
			<p className="mb-8 opacity-60">Ce produit n&rsquo;existe pas ou n&rsquo;est plus disponible.</p>
			<div className="flex gap-4">
				<Link
					className="border-quaternary text-quaternary hover:bg-quaternary hover:text-primary border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
					href="/collections"
				>
					Voir la boutique
				</Link>
				<Link
					className="border-quaternary text-quaternary hover:bg-quaternary hover:text-primary border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
					href="/"
				>
					Accueil
				</Link>
			</div>
		</div>
	);
}
