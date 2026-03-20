import CartButton from "./CartButton";
import Logo from "./Logo";
import NavBarHamburgerButton from "./NavBarHamburgerButton";
import NavBarMenu from "./NavBarMenu";

export default function NavBar() {
	return (
		<nav className="text-quaternary padding-container h-header relative">
			<div className="grid grid-cols-[1fr_auto_1fr] items-center">
				<Logo className="hidden justify-self-start md:block [&_a]:pr-6" />
				<NavBarHamburgerButton className="justify-self-start md:hidden" />

				<Logo className="justify-self-center md:hidden" type="large" />
				<NavBarMenu className="hidden justify-self-center md:flex" />

				<CartButton className="justify-self-end" />
			</div>
		</nav>
	);
}
