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
		<nav className="text-quaternary">
			<ul className="padding-container items-gap flex items-center justify-end">
				<NavBarItem className="mr-auto font-black" href={"/"} title="logo" />
				{routes.map(route => (
					<NavBarItem
						activeSegment={route.activeSegment}
						className="hidden sm:inline"
						href={route.href}
						key={route.id}
						title={route.title}
					/>
				))}
				<p className="inlin sm:hidden">hamburger</p>
			</ul>
		</nav>
	);
}
