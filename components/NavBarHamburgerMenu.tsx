import Image from "next/image";
import Link from "next/link";
import { HEAD_MENU } from "@/lib/constants";
import NavBarHamburgerMenuItem from "./NavBarHamburgerMenuItem";

type Props = {
	open: boolean;
	setIsClose: () => void;
};

export default function NavBarHamburgerMenu({ open, setIsClose }: Readonly<Props>) {
	if (!open) {
		return null;
	}

	return (
		<div className="bg-quaternary text-primary fixed inset-0 z-30 overflow-auto sm:hidden">
			<div className="align-center padding-container fixed inset-x-0 flex h-20 justify-between text-3xl">
				<Link href="/" onClick={setIsClose}>
					<Image
						alt="logo"
						height={1419}
						src="/images/logo-light.png"
						width={762}
						className="h-20 w-auto py-6"
					/>
				</Link>
				<button className="cursor-pointer" onClick={setIsClose}>
					x
				</button>
			</div>
			<div className="padding-container my-28 flex flex-col gap-4">
				<NavBarHamburgerMenuItem
					menu={{ activeSegment: null, href: "/", title: "home" }}
					setIsClose={setIsClose}
				/>
				{HEAD_MENU.map(menu => (
					<NavBarHamburgerMenuItem menu={menu} key={menu.href} setIsClose={setIsClose} />
				))}
				<NavBarHamburgerMenuItem
					menu={{ activeSegment: ["basket"], href: "/basket", title: "panier" }}
					setIsClose={setIsClose}
				/>
			</div>
		</div>
	);
}
