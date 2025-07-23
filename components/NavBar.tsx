import { HEAD_MENU } from "@/lib/constants";
import NavBarItem from "./NavBarItem";

export default function Menu() {
	return (
		<nav className="text-quaternary padding-container">
			<ul className="items-gap flex h-16 items-center justify-end">
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
