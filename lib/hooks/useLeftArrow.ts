import { useEffect } from "react";

const useLeftArrow = (onEscape: () => void) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") onEscape();
		};
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [onEscape]);
};

export default useLeftArrow;
