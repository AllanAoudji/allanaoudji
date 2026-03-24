import Link from "next/link";
import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import SubTitle from "./SubTitle";
import WorksGallerySectionContainer from "./WorksGallerySectionContainer";
import { getWorks } from "@/sanity/lib/queries";

export default async function WorksGallerySection() {
	const query = await getWorks(0, FETCH_WORKS_GALLERY);

	if (!query || !query.works || !query.works.length) {
		return (
			<div className="justify-cente flex flex-col items-center pt-16">
				<div className="mb-8 text-center">
					<SubTitle>La galerie se remplit bientôt.</SubTitle>
					<p>Revenez découvrir mes créations 🙂</p>
				</div>
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

	return (
		<div className="grid grid-cols-1">
			<WorksGallerySectionContainer initialWorks={query.works} initialTotal={query.total ?? 0} />
		</div>
	);
}
