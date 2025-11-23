import { cookies } from "next/headers";
import { CartProvider } from "@/lib/contexts/cart-context";
import { getCart } from "@/lib/shopify";

type Props = {
	children: React.ReactNode;
};

export default async function CartDispenser({ children }: Readonly<Props>) {
	const cartId = (await cookies()).get("cartId")?.value;
	const cart = getCart(cartId);

	return <CartProvider cartPromise={cart}>{children}</CartProvider>;
}
