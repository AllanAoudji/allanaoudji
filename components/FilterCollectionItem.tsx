"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Collection from "@/types/collection";

type Props = {
	item: Collection;
};

export default function FilterCollectionItem({ item }: Readonly<Props>) {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const active = pathName === item.path;
	const newParams = new URLSearchParams(searchParams.toString());

	newParams.delete("q");

	const href = `${item.path}?${newParams.toString()}`;

	return (
		<li className={cn("block text-sm")}>
			<Link
				className={cn(
					"flex items-center py-0.5 text-xs font-bold uppercase",
					"group-hover:[&_span]:opacity-25 hover:[&_span]:opacity-100!",
					{
						"group-hover:[&_span]:after:origin-right group-hover:[&_span]:after:scale-x-0 hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100":
							active,
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100": !active,
					},
				)}
				href={href}
			>
				<span
					className={cn(
						"relative transition-opacity duration-300",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						{
							"after:origin-left after:scale-x-100": active,
							"opacity-25 after:origin-right after:scale-x-0": !active,
						},
					)}
				>
					{item.title}
				</span>
			</Link>
		</li>
	);
}
