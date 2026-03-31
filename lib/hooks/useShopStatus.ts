export function useShopStatus() {
	const isEnabled = process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
	return { isEnabled };
}
