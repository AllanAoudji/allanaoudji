"use client";

import { createClient } from "@sanity/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiVersion, dataset, projectId } from "@/studio/env.public";

const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: false,
	withCredentials: true,
});

export default function StudioBar() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		async function check() {
			try {
				const user = await client.request({ uri: "/users/me" });
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
			className="fixed right-6 bottom-6 z-50 rounded-full bg-[#e9186b] px-4 py-2 text-sm text-white shadow-lg transition-colors hover:bg-[#c8146f]"
			href="/studio"
		>
			Studio →
		</Link>
	);
}
