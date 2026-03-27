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
	open: boolean;
	onCloseAction: () => void;
	children: React.ReactNode;
	className?: string;
	closeOn?: MediaQuery;
};
export default function FullscreenModal({
	open,
	onCloseAction,
	children,
	className,
	closeOn,
}: Readonly<Props>) {
	const { width } = useWindowDimensions();

	const prevWidth = useRef(width);

	useBodyScrollLock(open);
	useEscape(onCloseAction);

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
						escapeDeactivates: false,
						returnFocusOnDeactivate: true,
						allowOutsideClick: true,
						fallbackFocus: () => document.body,
					}}
				>
					<motion.div
						className={cn("bg-primary top-header fixed left-0 z-50 h-full w-full shadow-xl")}
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
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
