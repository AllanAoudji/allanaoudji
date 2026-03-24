import { Suspense } from "react";
import FooterCopyright from "./FooterCopyright";
import FooterMenu from "./FooterMenu";

export default function Footer() {
	return (
		<footer className="padding-container pt-20 pb-8 text-sm">
			<FooterMenu />
			<Suspense fallback={null}>
				<FooterCopyright />
			</Suspense>
		</footer>
	);
}
