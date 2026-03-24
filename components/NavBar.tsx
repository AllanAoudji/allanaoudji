import NavBarCartModalButton from "./NavBarCartModalButton";
import NavBarLogo from "./NavBarLogo";
import Logo from "./NavBarLogo";
import NavBarMenu from "./NavBarMenu";
import NavBarModalButton from "./NavBarModalButton";

export default function NavBar() {
	return (
		<nav className="text-quaternary padding-container h-header relative">
			<div className="grid grid-cols-[1fr_auto_1fr] items-center">
				<Logo className="hidden justify-self-start md:block [&_a]:pr-6" />
				<NavBarModalButton className="justify-self-start md:hidden" />

				<NavBarLogo className="justify-self-center md:hidden" type="large" />
				<NavBarMenu className="hidden justify-self-center md:flex" />

				<NavBarCartModalButton className="justify-self-end" />
			</div>
		</nav>
	);
}
