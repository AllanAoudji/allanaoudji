import { HEAD_MENU } from "@/lib/constants";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import NavBarCartModal from "./NavBarCartModal";
import NavBarHamburger from "./NavBarHamburger";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
	return (
		<nav className="text-quaternary padding-container relative h-20">
			<div className="grid grid-cols-[1fr_auto_1fr] items-center">
				<Logo className="hidden justify-self-start sm:block [&_a]:pr-6" />
				<NavBarHamburger className="justify-self-start sm:hidden" />

				<Logo className="justify-self-center sm:hidden [&_a]:px-6" />
				<ul className="group hidden items-center justify-center justify-self-center sm:flex">
					{HEAD_MENU.map(menu => (
						<NavBarItem
							activeSegment={menu.activeSegment}
							className="hidden sm:inline"
							href={menu.href}
							key={menu.href}
							title={menu.title}
						/>
					))}
				</ul>

				<CartIcon className="justify-self-end" />
			</div>
			<NavBarCartModal />
		</nav>
	);
}
