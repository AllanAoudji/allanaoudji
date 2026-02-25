import clsx from "clsx";
import { ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Cart from "@/types/cart";
import Product from "@/types/product";

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
