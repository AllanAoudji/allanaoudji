"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type MenuItem = {
	id: number;
	href: string;
	title: string;
	activeSegment: string | null;
};

const routes: MenuItem[] = [
	{
		id: 0,
		href: "/",
		title: "Home",
		activeSegment: null,
	},
	{
		id: 1,
		href: "/gallery",
		title: "galerie",
		activeSegment: "gallery",
	},
	{
		id: 2,
		href: "/shop",
		title: "boutique",
		activeSegment: "shop",
	},
	{
		id: 3,
		href: "/about",
		title: "à propos",
		activeSegment: "about",
	},
	{
		id: 4,
		href: "/contact",
		title: "contact",
		activeSegment: "contact",
	},
];

export default function Menu() {
	const activeSegment = useSelectedLayoutSegment();
	return (
		<ul className="sticky flex w-screen justify-end gap-4 bg-red-400 p-4 text-2xl text-emerald-50">
			{routes.map(route => (
				<li key={route.id}>
					<Link href={route.href} className={activeSegment === route.activeSegment ? "underline" : ""}>
						{route.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
