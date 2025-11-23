import { HEAD_MENU } from "@/lib/constants";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
	return (
		<nav className="text-quaternary padding-container">
			<ul className="flex h-16 items-center justify-end gap-4">
				<NavBarItem className="mr-auto font-black" href={"/"} title="logo" />
				{HEAD_MENU.map(menu => (
					<NavBarItem
						activeSegment={menu.activeSegment}
						className="hidden sm:inline"
						href={menu.href}
						key={menu.href}
						title={menu.title}
					/>
				))}
				<p className="inlin sm:hidden">hamburger</p>
			</ul>
		</nav>
	);
}
