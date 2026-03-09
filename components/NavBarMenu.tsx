import { HEAD_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import NavBarMenuItem from "./NavBarMenuItem";

type Props = {
	asHome?: boolean;
	className?: string;
	color?: "dark" | "light";
	type?: "vertical" | "horizontal";
};

export default function NavBarMenu({
	asHome = false,
	className,
	color,
	type = "horizontal",
}: Readonly<Props>) {
	return (
		<ul
			className={cn(
				"group flex w-full items-center justify-center",
				{ "flex-col items-start": type === "vertical" },
				className,
			)}
		>
			{asHome && <NavBarMenuItem color={color} href="/" title="home" type={type} />}
			{HEAD_MENU.map(menu => (
				<NavBarMenuItem
					activeSegment={menu.activeSegment}
					color={color}
					href={menu.href}
					key={menu.href}
					title={menu.title}
					type={type}
				/>
			))}
		</ul>
	);
}
