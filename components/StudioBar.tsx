"use client";

import { createClient } from "@sanity/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: "2021-06-07",
	useCdn: false,
	withCredentials: true, // envoie les cookies de session Sanity
});

export default function StudioBar() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		async function check() {
			try {
				const user = await client.request({ uri: "/users/me" });
				// Si connecté, Sanity retourne un objet avec un vrai id
				setLoggedIn(!!user?.id && user.id !== "me");
			} catch {
				setLoggedIn(false);
			}
		}

		check();
		const interval = setInterval(check, 10_000);
		return () => clearInterval(interval);
	}, []);

	if (!loggedIn) return null;

	return (
		<Link
			href="/studio"
			className="fixed right-6 bottom-6 z-50 rounded-full bg-[#e9186b] px-4 py-2 text-sm text-white shadow-lg transition-colors hover:bg-[#c8146f]"
		>
			Studio →
		</Link>
	);
}
