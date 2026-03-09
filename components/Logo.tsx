"use client";

import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";

type Type = "square" | "large";
type Color = "light" | "dark";

type Props = {
	className?: string;
	color?: Color;
	type?: Type;
};

const logoPath = (type?: Type, color?: Color) => {
	switch (type) {
		case "large":
			return color === "dark" ? "/images/logo-large-dark.png" : "/images/logo-large-light.png";
		default:
		case "square":
			return color === "dark" ? "/images/logo-dark.png" : "logo-light.png";
	}
};

export default function Logo({ className, color = "dark", type = "square" }: Readonly<Props>) {
	const { closeModal } = useModal();

	return (
		<div className={cn("flex", className)}>
			<Link className={"block"} href={"/"} onClick={closeModal}>
				<Image
					alt={"logo"}
					className="header-height w-auto py-4"
					height={1419}
					src={logoPath(type, color)}
					width={762}
				/>
			</Link>
		</div>
	);
}
