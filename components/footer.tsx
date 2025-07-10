import Link from "next/link";

export default function Footer() {
	return (
		<footer className="padding-container pt-52 pb-8 text-sm">
			<ul className="items-gap justify-center text-center sm:flex">
				<li>
					<Link href="/legal-notices">Mentions légales</Link>
				</li>
				<li>
					<Link href="/privacy-policy">politique de confidentialité</Link>
				</li>
				<li>
					<Link href="/general-conditions-of-sale">conditions générales de vente</Link>
				</li>
			</ul>
			<p className="pt-4 text-center text-xs italic">Allan Aoudji@2025</p>
		</footer>
	);
}
