import { HEAD_MENU, HOME_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import NavBarMenuItem from "./NavBarMenuItem";

type Props = {
	asHome?: boolean;
	className?: string;
	color?: "dark" | "light";
	direction?: "column" | "row";
};

export default function NavBarMenu({
	asHome = false,
	className,
	color,
	direction = "row",
}: Readonly<Props>) {
	return (
		<ul
			className={cn(
				"group flex w-full items-center justify-center",
				{ "flex-col items-start": direction === "column" },
				className,
			)}
		>
			{asHome && <NavBarMenuItem color={color} menu={HOME_MENU} title="home" direction={direction} />}
			{HEAD_MENU.map(menu => (
				<NavBarMenuItem
					color={color}
					menu={menu}
					key={menu.href}
					title={menu.title}
					direction={direction}
				/>
			))}
		</ul>
	);
}
