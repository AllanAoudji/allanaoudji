import CartButton from "./CartButton";
import Logo from "./Logo";
import NavBarHamburgerButton from "./NavBarHamburgerButton";

export default function NavBarModalHeader() {
	return (
		<div className="text-primary padding-container relative grid h-20 w-full grid-cols-[1fr_auto_1fr] items-center">
			<NavBarHamburgerButton className="justify-self-start" type="close" color="light" />

			<Logo className="justify-self-center [&_a]:px-6" color="light" type="large" />

			<CartButton className="justify-self-end" color="light" />
		</div>
	);
}
