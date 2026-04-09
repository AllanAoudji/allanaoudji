"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Title from "@/components/Title";
import "@/app/globals.css";

export default function GlobalError({ error }: { error: Error; reset: () => void }) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="fr">
			<body className="font-gopher bg-primary text-secondary flex h-dvh flex-col items-center justify-center antialiased">
				<div className="flex flex-col items-center justify-center">
					<p className="text-sm tracking-widest uppercase opacity-40">500</p>
					<Title>Erreur critique</Title>
					<p className="max-w-md text-center">
						Une erreur inattendue est survenue. Réessaie dans quelques instants.
					</p>
					{process.env.NODE_ENV === "development" && (
						<p className="font-mono text-xs opacity-30">global-error</p>
					)}
					<button
						className="border-secondary hover:bg-secondary hover:text-quaternary mt-4 cursor-pointer border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
						onClick={() => window.location.reload()}
					>
						Réessayer
					</button>
				</div>
			</body>
		</html>
	);
}
