import { cn, convertCurrencyCode } from "@/lib/utils";
import { Money } from "@/types/money";

type Props = {
	className?: string;
	price: Money;
};

export default function ProductPrice({ className, price }: Readonly<Props>) {
	return (
		<p className={cn(className)}>
			{parseFloat(price.amount).toFixed(2)} {convertCurrencyCode(price.currencyCode)}
		</p>
	);
}
