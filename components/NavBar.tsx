import NavBarItem from "./NavBarItem";
import MENU from "@/utils/menu";

export default function Menu() {
	return (
		<nav className="text-quaternary padding-container">
			<ul className="items-gap flex h-16 items-center justify-end">
				<NavBarItem className="mr-auto font-black" href={"/"} title="logo" />
				{MENU.map(menu => (
					<NavBarItem
						activeSegment={menu.activeSegment}
						className="hidden sm:inline"
						href={menu.href}
						key={menu.id}
						title={menu.title}
					/>
				))}
				<p className="inlin sm:hidden">hamburger</p>
			</ul>
		</nav>
	);
}
