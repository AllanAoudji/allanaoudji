"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";

type Props = {
	children: ReactNode;
	onCloseAction: () => void;
	open: boolean;
	position?: "left" | "right";
};

export default function DrawerModal({ children, onCloseAction, open, position = "right" }: Props) {
	const isRight = position === "right";

	/* body scroll lock */
	useEffect(() => {
		if (open) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<AnimatePresence>
			{open && (
				<>
					{/* overlay */}
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-40 bg-black/40"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={onCloseAction}
					/>

					{/* drawer */}
					<motion.div
						animate={{ x: 0 }}
						className={`bg-primary fixed top-0 z-50 h-full shadow-xl ${isRight ? "right-0" : "left-0"} w-fit max-w-[90vw]`}
						exit={{ x: isRight ? "100%" : "-100%" }}
						initial={{ x: isRight ? "100%" : "-100%" }}
						transition={{
							duration: 0.32,
							ease: [0.32, 0.72, 0, 1],
						}}
					>
						{/* header */}
						<div className="flex justify-end border-b p-4">
							<button onClick={onCloseAction}>✕</button>
						</div>

						{/* content */}
						<div className="overflow-y-auto">{children}</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
