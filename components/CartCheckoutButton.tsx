import { useFormStatus } from "react-dom";

export default function CartCheckoutButton() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? "Processing..." : "Checkout"}
		</button>
	);
}
