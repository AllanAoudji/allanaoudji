import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function ConfirmationContent({ searchParams }: { searchParams: SearchParams }) {
	const params = await searchParams;
	const orderName = params["checkout[order][name]"] ?? params["order_name"] ?? null;

	return (
		<div className="mx-auto max-w-xl px-6 py-20 text-center">
			<div className="mb-6 text-4xl">✓</div>
			<h1 className="mb-4 text-2xl font-medium">Commande confirmée</h1>
			{orderName && <p className="mb-2 text-sm text-gray-500">Commande {orderName}</p>}
			<p className="mb-8 text-gray-600">
				Merci pour votre achat ! Vous recevrez un email de confirmation dans quelques instants.
			</p>
			<Link
				href="/"
				className="inline-block rounded-md bg-black px-6 py-3 text-sm text-white transition hover:opacity-80"
			>
				Retour à la boutique
			</Link>
		</div>
	);
}

export default function ConfirmationPage({ searchParams }: { searchParams: SearchParams }) {
	return (
		<Suspense>
			<ConfirmationContent searchParams={searchParams} />
		</Suspense>
	);
}

export const metadata: Metadata = {
	title: "Commande confirmée",
	robots: { index: false },
};
