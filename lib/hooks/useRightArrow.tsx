import { useEffect } from "react";

const useRightArrow = (onEscape: () => void) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") onEscape();
		};
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [onEscape]);
};

export default useRightArrow;
