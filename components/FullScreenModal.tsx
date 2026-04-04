"use client";

import { FocusTrap } from "focus-trap-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import useBodyScrollLock from "@/lib/hooks/useBodyScrollLock";
import useEscape from "@/lib/hooks/useEscape";
import useWindowDimensions from "@/lib/hooks/useWindowDimensions";
import { cn, convertMediaQuery } from "@/lib/utils";
import MediaQuery from "@/types/MediaQuery";

type Props = {
	children: React.ReactNode;
	className?: string;
	closeOn?: MediaQuery;
	onCloseAction: () => void;
	open: boolean;
};
export default function FullscreenModal({
	children,
	className,
	closeOn,
	onCloseAction,
	open,
}: Readonly<Props>) {
	const { width } = useWindowDimensions();
	useBodyScrollLock(open);
	useEscape(onCloseAction);

	const prevWidth = useRef(width);

	useEffect(() => {
		if (prevWidth.current === width) return;
		prevWidth.current = width;

		if (!!closeOn && open && !!width && width >= convertMediaQuery(closeOn)) {
			onCloseAction();
		}
	}, [closeOn, onCloseAction, open, width]);

	return (
		<AnimatePresence>
			{open && (
				<FocusTrap
					focusTrapOptions={{
						allowOutsideClick: true,
						escapeDeactivates: false,
						fallbackFocus: () => document.body,
						returnFocusOnDeactivate: true,
					}}
				>
					<motion.div
						animate={{ x: 0 }}
						className="bg-primary top-header fixed left-0 z-50 h-dvh w-full shadow-xl"
						exit={{ x: "-100%" }}
						initial={{ x: "-100%" }}
						transition={{
							duration: 0.32,
							ease: [0.32, 0.72, 0, 1],
						}}
					>
						<div className={cn("vertical-padding h-full overflow-y-auto", className)}>{children}</div>
					</motion.div>
				</FocusTrap>
			)}
		</AnimatePresence>
	);
}
