import FooterMenuItem from "./FooterMenuItem";
import { FOOT_MENU } from "@/utils/menu";

export default function FooterMenu() {
	return (
		<ul className="items-gap justify-center text-center sm:flex">
			{FOOT_MENU.map(menu => (
				<FooterMenuItem key={menu.id} menu={menu} />
			))}
		</ul>
	);
}
