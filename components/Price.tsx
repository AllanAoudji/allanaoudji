import { cn, convertCurrencyCode } from "@/lib/utils";
import Money from "@/types/money";

type Props = {
	className?: string;
	price: Money;
};

export default function Price({ className, price }: Readonly<Props>) {
	return (
		<span className={cn(className)}>
			{parseFloat(price.amount).toFixed(2)}
			{convertCurrencyCode(price.currencyCode)}
		</span>
	);
}
