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
			return color === "dark" ? "/images/logo-square-dark.png" : "logo-square-light.png";
	}
};

export default function Logo({ className, color = "dark", type = "square" }: Readonly<Props>) {
	const { closeModal } = useModal();

	return (
		<div className={cn("flex", className)}>
			<Link className={"block"} href={"/"} onClick={closeModal}>
				<Image
					alt={"logo"}
					className={cn("h-header w-auto py-2.5", {
						"py-3": type === "large",
					})}
					height={762}
					src={logoPath(type, color)}
					width={type === "square" ? 1419 : 2183}
				/>
			</Link>
		</div>
	);
}
