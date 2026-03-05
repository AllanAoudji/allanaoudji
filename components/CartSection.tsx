import { CartSectionItem } from "./CartSectionItem";
import CartSummary from "./CartSummary";
import Title from "./Title";
import Cart from "@/types/cart";

type Props = {
	cart: Cart;
};

export default function CartSection({ cart }: Readonly<Props>) {
	return (
		<>
			<Title>Votre panier</Title>
			<section className="vertical-padding">
				<table className="w-full min-w-max table-auto text-left">
					<thead className="text-xs uppercase">
						<tr className="">
							<th className="w-[80%] py-2 md:w-[45%]">produit</th>
							<th className="hidden w-[35%] py-2 md:block">quantité</th>
							<th className="w-[20%] py-2">total</th>
						</tr>
					</thead>
					<tbody>
						{cart.lines
							.sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
							.map(line => (
								<CartSectionItem item={line} key={line.id} />
							))}
					</tbody>
				</table>
				<CartSummary cart={cart} />
			</section>
		</>
	);
}
