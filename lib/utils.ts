import clsx from "clsx";
import { ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import MediaQuery from "@/types/MediaQuery";
import Cart from "@/types/cart";
import Product from "@/types/product";
import ProductVariant from "@/types/productVariant";

export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};

export function convertCurrencyCode(currencyCode: string): string {
	switch (currencyCode) {
		case "USD":
			return "$";
		case "EUR":
			return "€";
		case "GBP":
			return "£";
		default:
			return currencyCode;
	}
}

export const convertMediaQuery = (mediaQuery: MediaQuery): number => {
	switch (mediaQuery) {
		default:
		case "sm":
			return 640;
		case "md":
			return 768;
		case "lg":
			return 1024;
		case "xl":
			return 1280;
		case "2xl":
			return 1536;
	}
};

export function createUrl(
	pathname: string,
	params: URLSearchParams | ReadonlyURLSearchParams,
): string {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

	return `${pathname}${queryString}`;
}

export const ensureStartWith = (url: string, prefix: string): string => {
	if (!url.startsWith(prefix)) {
		return prefix + url;
	}
	return url;
};

export function getLineQuantity(cart: Cart, variantId: string): number {
	const line = cart.lines.find(line => line.merchandise.id === variantId);

	return line?.quantity ?? 0;
}

export function getProductDefaultVariant(product: Product): string | undefined {
	const { variants } = product;

	if (variants.length === 1) {
		return undefined;
	}

	return new URLSearchParams(
		variants[0].selectedOptions.map(option => [option.name.toLocaleLowerCase(), option.value]),
	).toString();
}

export function buildGalleryImages(product: Product, variant: ProductVariant | undefined) {
	const variantImage = variant?.image ?? null;
	const featuredImage = product.featuredImage ?? null;

	const galleryImages = product.images ?? [];

	const variantImagesSet = new Set(product.variants.map(v => v.image?.url).filter(Boolean));

	const images = [];

	if (variantImage?.url) {
		images.push(variantImage);
	} else if (featuredImage?.url) {
		images.push(featuredImage);
	}

	const filteredGallery = galleryImages.filter(img => {
		if (img.url === featuredImage?.url) return false;

		if (variantImagesSet.has(img.url)) return false;

		return true;
	});

	images.push(...filteredGallery.slice(0, 3));

	return images;
}
