"use client";

import Link from "next/link";
import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import SubTitle from "./SubTitle";

type Props = {
	handle: string | undefined;
};

export default function ProductsShopEmpty({ handle }: Readonly<Props>) {
	const { collections } = useLocalShopify();

	const collectionName = collections.find(collection => collection.handle === handle)?.title;

	return (
		<div className="justify-cente flex flex-col items-center pt-16">
			<div className="mb-8 text-center">
				{collectionName ? (
					<>
						<SubTitle>La collection {collectionName} arrive bientôt.</SubTitle>
						<p>revenez nous voir 🙂</p>
					</>
				) : (
					<>
						<SubTitle>Pas encore &rsquo;articles ici.</SubTitle>
						<p>À très vite 🙂</p>
					</>
				)}
			</div>
			<div className="flex flex-col gap-4 sm:flex-row">
				<Link
					className="hover:bg-quaternary hover:text-primary border-quaternary border px-12 py-2 text-center text-xs tracking-widest uppercase transition-colors"
					href="/"
				>
					Acceuil
				</Link>
				{collectionName && (
					<Link
						className="hover:bg-quaternary hover:text-primary border-quaternary border px-12 py-2 text-center text-xs tracking-widest uppercase transition-colors"
						href="/collections"
					>
						Toutes les collections
					</Link>
				)}
			</div>
		</div>
	);
}
