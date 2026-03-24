"use client";

import Link from "next/link";
import { useCallback } from "react";
import Title from "@/components/Title";

type Props = {
	error: Error;
	reset?: () => void;
};

export default function Error({ error, reset }: Readonly<Props>) {
	const handleReset = useCallback(() => {
		reset?.();
	}, [reset]);

	return (
		<div>
			<p className="text-sm tracking-widest uppercase opacity-50">Erreur</p>
			<Title>Quelque chose s&rsquo;est mal passé</Title>
			<div className="mb-8">
				<p>Une erreur temporaire est survenue. Réessaie dans quelques instants.</p>

				{process.env.NODE_ENV === "development" && (
					<p className="font-mono text-xs opacity-40">{error.message}</p>
				)}
			</div>

			<div className="flex gap-4">
				{reset && (
					<button
						onClick={handleReset}
						className="border-quaternary text-quaternary hover:bg-quaternary hover:text-primary cursor-pointer border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
					>
						Réessayer
					</button>
				)}
				<Link
					href="/"
					className="border-quaternary text-quaternary hover:bg-quaternary hover:text-primary border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
				>
					Accueil
				</Link>
			</div>
		</div>
	);
}
