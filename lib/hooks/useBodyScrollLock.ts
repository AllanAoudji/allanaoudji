import { useEffect } from "react";

const FIXED_SELECTORS = ["header", "[data-fixed]"];

const applyScrollbarCompensation = (scrollbarWidth: number) => {
	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = `${scrollbarWidth}px`;
	FIXED_SELECTORS.forEach(selector => {
		document.querySelectorAll<HTMLElement>(selector).forEach(el => {
			el.style.paddingRight = `${scrollbarWidth}px`;
		});
	});
};

const resetScrollbarCompensation = () => {
	document.body.style.overflow = "";
	document.body.style.paddingRight = "";
	FIXED_SELECTORS.forEach(selector => {
		document.querySelectorAll<HTMLElement>(selector).forEach(el => {
			el.style.paddingRight = "";
		});
	});
};

const useBodyScrollLock = (lock: boolean) => {
	useEffect(() => {
		if (lock) {
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			applyScrollbarCompensation(scrollbarWidth);
		} else {
			resetScrollbarCompensation();
		}

		return resetScrollbarCompensation;
	}, [lock]);
};

export default useBodyScrollLock;
