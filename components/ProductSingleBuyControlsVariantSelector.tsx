"use client";

import Form from "next/form";
import { useCallback, useMemo } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { useProduct } from "@/lib/contexts/product-context";
import { useUpdateURL } from "@/lib/hooks/useUpdateUrl";
import { cn } from "@/lib/utils";
import ProductOption from "@/types/productOption";
import ProductVariant from "@/types/productVariant";

type Combination = {
	availableForSale: boolean;
	id: string;
	[key: string]: string | boolean;
};
type Props = {
	className?: string;
	onClick?: () => void;
	options: ProductOption[];
	variants: ProductVariant[];
};

export default function ProductSingleBuyControlsVariantSelector({
	className,
	onClick,
	options,
	variants,
}: Readonly<Props>) {
	const { resetProductMessage } = useCartActions();
	const { state, updateOption } = useProduct();

	const updateURL = useUpdateURL();

	const combinations: Combination[] = useMemo(
		() =>
			variants.map(variant => ({
				availableForSale: variant.availableForSale,
				id: variant.id,
				...variant.selectedOptions.reduce(
					(acc, option) => ({
						...acc,
						[option.name.toLowerCase()]: option.value,
					}),
					{},
				),
			})),
		[variants],
	);

	const hasNoOptionsOrJustOneOption =
		!options.length || (options.length === 1 && options[0].values.length === 1);

	const handleClick = useCallback(() => {
		if (onClick) onClick();
		resetProductMessage();
	}, [onClick, resetProductMessage]);

	if (hasNoOptionsOrJustOneOption) return null;

	return (
		<div className={cn(className)}>
			{options.map(option => (
				<Form action="pick variant" key={option.id}>
					<dl className="mb-4">
						<dt className="mb-1 text-xs tracking-wide uppercase">{option.name}</dt>
						<dd className="flex flex-wrap gap-2">
							{option.values.map(value => {
								const optionNameLowerCase = option.name.toLocaleLowerCase();
								const optionParams = { ...state, [optionNameLowerCase]: value };
								const filtered = Object.entries(optionParams).filter(([key, value]) =>
									options.find(option => option.name.toLowerCase() === key && option.values.includes(value)),
								);
								const isAvailableForSale = combinations.find(combination =>
									filtered.every(
										([key, value]) => combination[key] === value && combination.availableForSale,
									),
								);

								const isActive = state[optionNameLowerCase] === value;

								return (
									<button
										aria-disabled={!isAvailableForSale}
										className={cn("border-secondary font-sm rounded-full border-2 px-3", {
											"bg-secondary text-primary": isActive,
											"line-through opacity-50": !isAvailableForSale,
										})}
										disabled={!isAvailableForSale}
										formAction={() => {
											const newState = updateOption(optionNameLowerCase, value);
											updateURL(newState);
										}}
										key={value}
										onClick={handleClick}
										title={`${option.name} ${value}${isAvailableForSale && "(out of stock)"}`}
									>
										{value}
									</button>
								);
							})}
						</dd>
					</dl>
				</Form>
			))}
		</div>
	);
}
