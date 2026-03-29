import { getExtension, getImageDimensions } from "@sanity/asset-utils";
import { ImageValue } from "sanity";

export const validateImageRatio = (targetRatio: number, minWidth = 800) => {
	return (value: ImageValue | undefined) => {
		if (!value?.asset?._ref) return true;

		const filetype = getExtension(value.asset._ref);
		if (filetype !== "jpg" && filetype !== "png") {
			return "L'image doit être un JPG ou PNG";
		}

		const { width, height } = getImageDimensions(value.asset._ref);
		const ratio = width / height;
		const tolerance = 0.02;

		if (Math.abs(ratio - targetRatio) > tolerance) {
			return `Ratio incorrect (actuel : ${ratio.toFixed(2)}, attendu : ${targetRatio.toFixed(2)})`;
		}

		if (width < minWidth) {
			return `Largeur minimum : ${minWidth}px (actuelle : ${width}px)`;
		}

		return true;
	};
};
