import Link from "next/link";
import Title from "@/components/Title";

export default function ProductNotFound() {
	return (
		<div className="vertical-padding padding-container">
			<Title>Galerie introuvable</Title>
			<p className="text-sm tracking-widest uppercase opacity-40">erreur 404</p>
			<p className="mb-8 opacity-60">Cette gallerie n&apos;existe pas.</p>
			<div className="flex gap-4">
				<Link
					className="border-quaternary text-quaternary hover:bg-quaternary hover:text-primary border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
					href="/gallery"
				>
					Voir les galleries
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
