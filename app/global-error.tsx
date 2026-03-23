"use client";

import Title from "@/components/Title";

export default function GlobalError({ reset }: { reset: () => void }) {
	return (
		<html lang="fr">
			<body className="font-gopher bg-primary text-quaternary flex h-screen flex-col justify-between antialiased">
				<p className="text-sm tracking-widest uppercase opacity-40">500</p>
				<Title>Erreur critique</Title>
				<p className="max-w-md text-center opacity-60">
					Une erreur inattendue est survenue. Réessaie dans quelques instants.
				</p>
				{process.env.NODE_ENV === "development" && (
					<p className="font-mono text-xs opacity-30">global-error</p>
				)}
				<button
					onClick={reset}
					className="border-primary text-primary hover:bg-primary hover:text-quaternary border px-6 py-2 text-sm tracking-widest uppercase transition-colors"
				>
					Réessayer
				</button>
			</body>
		</html>
	);
}
