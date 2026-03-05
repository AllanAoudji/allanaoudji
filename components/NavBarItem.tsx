"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Props = {
	activeSegment?: string[] | null;
	className?: string;
	href: string;
	title: string;
};

export default function NavBarItem({ activeSegment, className, href, title }: Readonly<Props>) {
	const isActiveSegment = useSelectedLayoutSegment();

	const isActive = useMemo(() => {
		return isActiveSegment && activeSegment?.includes(isActiveSegment);
	}, [activeSegment, isActiveSegment]);

	return (
		<li className={cn("block", className)}>
			<Link
				className={cn(
					"flex h-20 items-center px-2 text-sm font-black uppercase",
					"group-hover:[&_span]:opacity-25 hover:[&_span]:opacity-100!",
					{
						"group-hover:[&_span]:after:origin-right group-hover:[&_span]:after:scale-x-0 hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100":
							isActive,
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100": !isActive,
					},
				)}
				href={href}
			>
				<span
					className={cn(
						"relative pb-1 transition-opacity duration-300",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						{
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
