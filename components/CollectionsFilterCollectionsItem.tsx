"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { DEFAULT_COLLECTION_IMAGE } from "@/lib/constants";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import Collection from "@/types/collection";

type Props = {
	item: Collection;
};

export default function CollectionsFilterCollectionsItem({ item }: Readonly<Props>) {
	const { closeModal } = useModal();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const isActive = pathName === item.path;
	const newParams = new URLSearchParams(searchParams.toString());

	newParams.delete("q");

	const href = `${item.path}?${newParams.toString()}`;

	return (
		<li className={cn("group block text-sm")}>
			<Link href={href} onClick={closeModal} replace={true}>
				<div className="relative overflow-hidden">
					<ImageContainer
						className={cn("scale-[103%] transition-transform duration-500 group-hover:scale-100", {
							"scale-100!": isActive,
						})}
						image={item.image || DEFAULT_COLLECTION_IMAGE}
						ratio="4/3"
					/>
				</div>
				<div>
					<h3
						className={cn(
							"inline overflow-hidden text-xs font-bold whitespace-nowrap uppercase",
							"relative pb-0.5",
							"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
							"after:ease after:transition-transform after:duration-700 after:will-change-transform",
							"after:origin-right after:scale-x-0",
							{
								"after:origin-left after:scale-x-100": isActive,
								"after:origin-right after:scale-x-0": !isActive,
							},
						)}
					>
						{item.title}
					</h3>
				</div>
			</Link>
		</li>
	);
}
