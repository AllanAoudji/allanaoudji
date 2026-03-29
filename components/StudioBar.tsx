// components/StudioBar.tsx
import Link from "next/link";

async function isLoggedInSanity(): Promise<boolean> {
	try {
		const res = await fetch(
			`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/users/me`,
			{ credentials: "include", cache: "no-store" },
		);
		return res.ok;
	} catch {
		return false;
	}
}

export default async function StudioBar() {
	const loggedIn = await isLoggedInSanity();
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
