"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import useBodyScrollLock from "@/lib/hooks/useBodyScrollLock";
import useEscape from "@/lib/hooks/useEscape";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { cn, convertMediaQuery } from "@/lib/utils";
import MediaQuery from "@/types/MediaQuery";

type Props = {
	children: ReactNode;
	className?: string;
	closeOn?: MediaQuery;
	onCloseAction: () => void;
	open: boolean;
	position?: "left" | "right";
};

export default function DrawerModal({
	children,
	className,
	closeOn,
	onCloseAction,
	open,
	position = "right",
}: Readonly<Props>) {
	const { width } = useWindowDimensions();

	const isRight = position === "right";

	useEscape(onCloseAction);
	useBodyScrollLock(open);

	useEffect(() => {
		if (!!closeOn && open && !!width && width >= convertMediaQuery(closeOn)) {
			onCloseAction();
		}
	}, [closeOn, onCloseAction, open, width]);

	return (
		<AnimatePresence>
			{open && (
				<>
					{/* overlay */}
					<motion.div
						animate={{ opacity: 1 }}
						className="bg-secondary/25 fixed inset-0 z-40 backdrop-blur-md"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={onCloseAction}
					/>

					{/* drawer */}
					<motion.div
						animate={{ x: 0 }}
						className={cn(`bg-primary fixed top-0 z-50 h-full w-fit max-w-[90vw] shadow-xl`, {
							"left-0": !isRight,
							"right-0": isRight,
						})}
						exit={{ x: isRight ? "100%" : "-100%" }}
						initial={{ x: isRight ? "100%" : "-100%" }}
						transition={{
							duration: 0.32,
							ease: [0.32, 0.72, 0, 1],
						}}
					>
						<div className={cn("overflow-y-auto", className)}>{children}</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
