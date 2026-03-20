"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";
import Collection from "@/types/collection";

type Props = {
	direction?: "column" | "row";
	item: Collection;
};

export default function FilterCollectionItem({ direction = "row", item }: Readonly<Props>) {
	const { closeModal } = useModal();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const active = pathName === item.path;
	const newParams = new URLSearchParams(searchParams.toString());

	newParams.delete("q");

	const href = `${item.path}?${newParams.toString()}`;

	return (
		<li
			className={cn("block text-sm", {
				"w-full": direction === "column",
			})}
		>
			<Link
				className={cn(
					"flex items-center py-0.5 text-xs uppercase",
					"group-hover:[&_span]:opacity-25 hover:[&_span]:opacity-100!",
					{
						"group-hover:[&_span]:after:origin-right group-hover:[&_span]:after:scale-x-0 hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100":
							active,
						"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100": !active,
						"h-10 px-2": direction === "row",
						"pl-auto py-1 pr-12": direction === "column",
					},
				)}
				href={href}
				onClick={closeModal}
				replace={true}
			>
				<span
					className={cn(
						"relative py-1 transition-opacity duration-300",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						{
							"after:origin-left after:scale-x-100": active,
							"after:origin-right after:scale-x-0": !active,
							"py-0.5": direction === "column",
						},
					)}
				>
					{item.title}
				</span>
			</Link>
		</li>
	);
}
