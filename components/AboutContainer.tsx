import Link from "next/link";
import PortableTextContent from "./PortableTextContent";
import SubTitle from "./SubTitle";
import { getAbout } from "@/sanity/lib/queries";

export default async function AboutContainer() {
	const result = await getAbout();

	if (!result || !result.about) {
		return (
			<div className="flex flex-col items-center justify-center pt-16">
				<SubTitle>Cette page est en cours de rédaction.</SubTitle>
				<p className="mb-2">Je prépare quelque chose pour te présenter très vite qui je suis.</p>
				<p className="mb-8">Reviens bientôt 🙂</p>
				<div className="flex flex-col gap-4 sm:flex-row">
					<Link
						className="hover:bg-quaternary hover:text-primary border-quaternary border px-12 py-2 text-center text-xs tracking-widest uppercase transition-colors"
						href="/"
					>
						Acceuil
					</Link>
				</div>
			</div>
		);
	}

	return <PortableTextContent value={result.about} />;
}
