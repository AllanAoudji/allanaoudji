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

export const ensureStartWith = (url: string, prefix: string): string => {
	if (!url.startsWith(prefix)) {
		return prefix + url;
	}
	return url;
};
