import NavBarItem from "./NavBarItem";

type MenuItem = {
	id: number;
	href: string;
	title: string;
	activeSegment: string | null;
};

const routes: MenuItem[] = [
	{
		id: 0,
		href: "/gallery",
		title: "galerie",
		activeSegment: "gallery",
	},
	{
		id: 1,
		href: "/shop",
		title: "boutique",
		activeSegment: "shop",
	},
	{
		id: 2,
		href: "/about",
		title: "à propos",
		activeSegment: "about",
	},
	{
		id: 3,
		href: "/contact",
		title: "contact",
		activeSegment: "contact",
	},
];

export default function Menu() {
	return (
		<nav className="bg-tertiary text-quaternary border-primary sticky w-screen border-b-4 px-8 py-5 text-2xl">
			<ul className="flex items-center justify-end gap-4">
				<NavBarItem className="mr-auto font-black" href={"/"} title="home" />
				{routes.map(route => (
					<NavBarItem
						activeSegment={route.activeSegment}
						href={route.href}
						key={route.id}
						title={route.title}
					/>
				))}
			</ul>
		</nav>
	);
}
