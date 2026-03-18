import { FOOT_MENU } from "@/lib/constants";
import FooterMenuItem from "./FooterMenuItem";

export default function FooterMenu() {
	return (
		<ul className="group items-center justify-center text-center sm:flex">
			{FOOT_MENU.map(menu => (
				<FooterMenuItem href={menu.href} key={menu.href} title={menu.title} />
			))}
		</ul>
	);
}
