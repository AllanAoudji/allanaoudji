"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
	activeSegment?: string | null;
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
		<li>
			<Link
				className={`${className} + ${isActiveSegment === activeSegment ? "underline" : ""}`}
				href={href}
			>
				{imageSrc ? <Image src={title} alt="test" width={208} height={300} /> : title}
			</Link>
		</li>
	);
}
