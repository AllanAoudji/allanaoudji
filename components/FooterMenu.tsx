import Link from "next/link";
import { FOOT_MENU } from "@/lib/constants";

export default function FooterMenu() {
	return (
		<ul className="justify-center gap-4 text-center sm:flex">
			{FOOT_MENU.map(menu => (
				<li key={menu.href}>
					<Link href={menu.href}>{menu.title}</Link>
				</li>
			))}
		</ul>
	);
}
