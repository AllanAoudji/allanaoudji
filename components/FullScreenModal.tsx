"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import useBodyScrollLock from "@/lib/hooks/useBodyScrollLock";
import useEscape from "@/lib/hooks/useEscape";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { convertMediaQuery } from "@/lib/utils";
import MediaQuery from "@/types/MediaQuery";

type Props = {
	open: boolean;
	onCloseAction: () => void;
	children: React.ReactNode;
	closeOn?: MediaQuery;
};
export default function FullscreenModal({
	open,
	onCloseAction,
	children,
	closeOn,
}: Readonly<Props>) {
	const { width } = useWindowDimensions();

	useBodyScrollLock(open);
	useEscape(onCloseAction);

	useEffect(() => {
		if (!!closeOn && open && !!width && width >= convertMediaQuery(closeOn)) {
			onCloseAction();
		}
	}, [closeOn, onCloseAction, open, width]);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="bg-primary fixed inset-0 z-50"
					initial={{ opacity: 0, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.98 }}
					transition={{
						duration: 0.25,
						ease: [0.32, 0.72, 0, 1],
					}}
				>
					{/* header */}
					<div className="flex justify-end border-b p-4">
						<button onClick={onCloseAction} className="text-lg hover:opacity-60">
							✕
						</button>
					</div>

					{/* content */}
					<div className="h-[calc(100%-56px)] overflow-y-auto">{children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
