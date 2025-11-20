"use client";

import Form from "next/form";
import { useProduct } from "@/lib/contexts/product-context";
import { useUpdateURL } from "@/lib/hooks/useUpdateUrl";
import { cn } from "@/lib/utils";
import { ProductOption } from "@/types/productOption";
import { ProductVariant } from "@/types/productVariant";

type Props = {
	options: ProductOption[];
	variants: ProductVariant[];
};

type Combination = {
	id: string;
	availableForSale: boolean;
	[key: string]: string | boolean;
};

export default function ProductVariantSelector({ options, variants }: Readonly<Props>) {
	const updateURL = useUpdateURL();
	const { state, updateOption } = useProduct();

	const combinations: Combination[] = variants.map(variant => ({
		id: variant.id,
		availableForSale: variant.availableForSale,
		...variant.selectedOptions.reduce(
			(acc, option) => ({
				...acc,
				[option.name.toLowerCase()]: option.value,
			}),
			{},
		),
	}));

	const hasNoOptionsOrJustOneOption =
		!options.length || (options.length === 1 && options[0].values.length === 1);

	if (hasNoOptionsOrJustOneOption) return null;

	return options.map(option => (
		<Form key={option.id} action="pick variant">
			<dl className="mb-8">
				<dt className="mb-4 text-sm tracking-wide uppercase">{option.name}</dt>
				<dd className="flex flex-wrap gap-3">
					{option.values.map(value => {
						const optionNameLowerCase = option.name.toLocaleLowerCase();
						const optionParams = { ...state, [optionNameLowerCase]: value };
						const filtered = Object.entries(optionParams).filter(([key, value]) =>
							options.find(option => option.name.toLowerCase() === key && option.values.includes(value)),
						);
						const isAvailableForSale = combinations.find(combination =>
							filtered.every(([key, value]) => combination[key] === value && combination.availableForSale),
						);

						const isActive = state[optionNameLowerCase] === value;

						return (
							<button
								key={value}
								aria-disabled={!isAvailableForSale}
								disabled={!isAvailableForSale}
								title={`${option.name} ${value}${isAvailableForSale && "(out of stock)"}`}
								className={cn({ "text-red-400": isActive })}
								formAction={() => {
									const newState = updateOption(optionNameLowerCase, value);
									updateURL(newState);
								}}
							>
								{value}
							</button>
						);
					})}
				</dd>
			</dl>
		</Form>
	));
}
