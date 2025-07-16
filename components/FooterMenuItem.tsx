import Link from "next/link";
import { Menu } from "@/types/menu";

type Props = {
	menu: Menu;
};

export default function FooterMenuItem({ menu }: Readonly<Props>) {
	return (
		<li>
			<Link href={menu.href}>{menu.title}</Link>
		</li>
	);
}
