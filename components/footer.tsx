import FooterMenu from "./FooterMenu";

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const year = currentYear === 2025 ? "2025" : `2025 - ${currentYear}`;

	return (
		<footer className="padding-container pt-16 pb-8 text-sm">
			<FooterMenu />
			<p className="pt-4 text-center text-xs italic">Allan Aoudji @ {year}</p>
		</footer>
	);
}
