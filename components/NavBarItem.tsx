"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

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
		<li className={className}>
			<Link
				className={isActiveSegment && activeSegment?.includes(isActiveSegment) ? "underline" : ""}
				href={href}
			>
				{imageSrc ? <Image alt="test" height={300} src={title} width={208} /> : title}
			</Link>
		</li>
	);
}
