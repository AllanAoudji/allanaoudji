export function useShopStatus() {
	// TODO: remettre cette ligne en production une fois que le shop sera prêt
	// const isEnabled = process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
	// return { isEnabled };
	return { isEnabled: true };
}
