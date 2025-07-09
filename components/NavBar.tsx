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
		<ul className="sticky flex w-screen justify-between bg-red-400 px-8 py-5 text-2xl text-emerald-50">
			<NavBarItem href={"/"} title="home" className="font-black" />
			<div className="flex justify-end gap-4">
				{routes.map(route => (
					<NavBarItem
						activeSegment={route.activeSegment}
						href={route.href}
						key={route.id}
						title={route.title}
					/>
				))}
			</div>
		</ul>
	);
}
