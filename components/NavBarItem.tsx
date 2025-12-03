"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
	activeSegment?: string[];
	className?: string;
	href: string;
	title: string;
	imageSrc?: string | StaticImport;
};

export default function NavBarItem({
	activeSegment,
	className,
	href,
	imageSrc,
	title,
}: Readonly<Props>) {
	const isActiveSegment = useSelectedLayoutSegment();

	return (
		<li className={cn(className)}>
			<Link
				className={cn(
					{
						underline: isActiveSegment && activeSegment?.includes(isActiveSegment),
						block: !!imageSrc,
						"nav-hover animation":
							!imageSrc && !(isActiveSegment && activeSegment?.includes(isActiveSegment)),
					},
					"decoration-2 underline-offset-4",
				)}
				href={href}
			>
				{imageSrc ? (
					<Image alt={title} height={1419} src={imageSrc} width={762} className="h-20 w-auto py-6" />
				) : (
					title
				)}
			</Link>
		</li>
	);
}
