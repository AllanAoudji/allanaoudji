import CartIcon from "./CartIcon";
import Logo from "./Logo";
import NavBarCartModal from "./NavBarCartModal";
import NavBarHamburger from "./NavBarHamburger";
import NavBarMenu from "./NavBarMenu";

export default function NavBar() {
	return (
		<nav className="text-quaternary padding-container relative h-20">
			<div className="grid grid-cols-[1fr_auto_1fr] items-center">
				<Logo className="hidden justify-self-start sm:block [&_a]:pr-6" />
				<NavBarHamburger className="justify-self-start sm:hidden" />

				<Logo className="justify-self-center sm:hidden [&_a]:px-6" />
				<NavBarMenu className="hidden justify-self-center sm:flex" />

				<CartIcon className="justify-self-end" />
			</div>
			<NavBarCartModal />
		</nav>
	);
}
