"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useMemo } from "react";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Props = {
	activeSegment?: string[] | null;
	color?: "dark" | "light";
	href: string;
	title: string;
	direction?: "column" | "row";
};

export default function NavBarMenuItem({
	activeSegment,
	color = "dark",
	href,
	title,
	direction = "row",
}: Readonly<Props>) {
	const isActiveSegment = useSelectedLayoutSegment();
	const { closeModal } = useModal();

	const isActive = useMemo(() => {
		return isActiveSegment && activeSegment?.includes(isActiveSegment);
	}, [activeSegment, isActiveSegment]);

	return (
		<li
			className={cn("block", {
				"w-full": direction === "column",
			})}
		>
			<Link
				className={cn(
					"text-quaternary text-md flex items-center py-0.5 font-bold uppercase",
					"group-hover:[&_span]:opacity-25 hover:[&_span]:opacity-100!",
					{
						"h-header px-2 py-0": direction === "row",
						"text-primary": color === "light",
						"group-hover:[&_span]:after:origin-right group-hover:[&_span]:after:scale-x-0 hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100":
							isActive,
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100": !isActive,
					},
				)}
				href={href}
				onClick={closeModal}
			>
				<span
					className={cn(
						"relative transition-opacity duration-300",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						{
							"py-1 text-sm": direction === "row",
							"after:bg-primary": color === "light",
							"after:origin-left after:scale-x-100": isActive,
							"after:origin-right after:scale-x-0": !isActive,
						},
					)}
				>
					{title}
				</span>
			</Link>
		</li>
	);
}
