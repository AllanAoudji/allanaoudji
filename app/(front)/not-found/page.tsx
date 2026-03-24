import Link from "next/link";
import Title from "@/components/Title";

export default function NotFoundPage() {
	return (
		<div className="vertical-padding padding-container">
			<Title>Page introuvable</Title>
			<p className="text-sm tracking-widest uppercase opacity-40">erreur 404</p>
			<p className="mb-8 opacity-60">La page que tu cherches n&rsquo;existe pas.</p>
			<Link
				href="/"
				className="border-quaternary text-quaternary hover:bg-quaternary hover:text-primary border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
			>
				Accueil
			</Link>
		</div>
	);
}
