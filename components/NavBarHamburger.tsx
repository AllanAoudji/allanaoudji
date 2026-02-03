"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HEAD_MENU } from "@/lib/constants";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";

export default function NavBarHamburger() {
	const isActiveSegment = useSelectedLayoutSegment();

	const [open, setOpen] = useState<boolean>(false);
	const { width } = useWindowDimensions();

	const setIsOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const setIsClose = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		if (open) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [open]);

	useEffect(() => {
		if (!width || (width >= 640 && open)) {
			setIsClose();
		}
	}, [open, setIsClose, width]);

	return (
		<>
			<button onClick={setIsOpen} className="inlin cursor-pointer sm:hidden">
				hamburger
			</button>
			{open && (
				<div className="bg-quaternary text-primary fixed inset-0 z-30 overflow-auto sm:hidden">
					<div className="align-center padding-container fixed inset-x-0 flex h-20 justify-between text-3xl">
						<Image
							alt="logo"
							height={1419}
							src="/images/logo-light.png"
							width={762}
							className="h-20 w-auto py-6"
						/>
						<button className="cursor-pointer" onClick={setIsClose}>
							x
						</button>
					</div>
					<div className="padding-container my-24 flex flex-col gap-4">
						<Link
							onClick={setIsClose}
							className={cn(
								{
									underline: isActiveSegment === null,
								},
								"text-center text-5xl decoration-2 underline-offset-4",
							)}
							href="/"
						>
							home
						</Link>
						{HEAD_MENU.map(menu => (
							<Link
								onClick={setIsClose}
								key={menu.href}
								href={menu.href}
								className={cn(
									{
										underline: isActiveSegment && menu.activeSegment?.includes(isActiveSegment),
										"nav-hover animation": !(
											isActiveSegment && menu.activeSegment?.includes(isActiveSegment)
										),
									},
									"text-center text-5xl decoration-2 underline-offset-4",
								)}
							>
								{menu.title}
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
}
