import { HEAD_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import NavBarMenuItem from "./NavBarMenuItem";

type Props = {
	className?: string;
};

export default function NavBarMenu({ className }: Readonly<Props>) {
	return (
		<ul className={cn("group flex items-center justify-center", className)}>
			{HEAD_MENU.map(menu => (
				<NavBarMenuItem
					activeSegment={menu.activeSegment}
					href={menu.href}
					key={menu.href}
					title={menu.title}
				/>
			))}
		</ul>
	);
}
