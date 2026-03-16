"use client";

import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { useProduct } from "@/lib/contexts/product-context";
import { cn } from "@/lib/utils";
import ProductCartAdd from "./ProductCartAdd";
import ProductCartInventory from "./ProductCartInventory";
import ProductCartQuantity from "./ProductCartQuantity";
import ProductPrice from "./ProductPrice";
import ProductVariantSelector from "./ProductVariantSelector";
import VariantInventory from "@/types/VariantInventory";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
	variantsInventory: VariantInventory[];
};

export default function ProductCart({ className, product, variantsInventory }: Readonly<Props>) {
	// --------------------------------
	// --------- State & Hooks --------
	// --------------------------------
	const { variants } = product;

	const { state } = useProduct();
	const { addItem, isPending, productMessage, resetProductMessage } = useCartActions();

	const [quantity, setQuantity] = useState<number | string>(1);

	// --------------------------------
	// ------------ variant -----------
	// --------------------------------
	const variant = useMemo(() => {
		return variants.find(variant =>
			variant.selectedOptions.every(option => option.value === state[option.name.toLocaleLowerCase()]),
		);
	}, [state, variants]);

	const defaultVariantId = useMemo(() => {
		return variants.length === 1 ? variants[0].id : undefined;
	}, [variants]);

	const selectedVariantId = useMemo(() => {
		return variant?.id || defaultVariantId!;
	}, [defaultVariantId, variant]);

	const finalVariant = useMemo(() => {
		return variants.find(variant => variant.id === selectedVariantId);
	}, [selectedVariantId, variants]);

	const finalVariantInventory = useMemo(() => {
		return (
			finalVariant &&
			variantsInventory.find(variantInventory => variantInventory.variantId === finalVariant.id)
		);
	}, [finalVariant, variantsInventory]);

	// --------------------------------
	// ----------- quantity -----------
	// --------------------------------
	const disableDecrementQuantity = useMemo(() => {
		return (
			(!finalVariantInventory && variants.length > 1) ||
			typeof quantity !== "number" ||
			(typeof quantity === "number" && quantity <= 1)
		);
	}, [finalVariantInventory, quantity, variants]);

	const disableIncrementQuantity = useMemo(() => {
		return (
			(!finalVariantInventory && variants.length > 1) ||
			typeof quantity !== "number" ||
			(!!finalVariantInventory &&
				finalVariantInventory.inventoryTracked &&
				typeof quantity === "number" &&
				quantity >= finalVariantInventory.inventoryQuantity)
		);
	}, [finalVariantInventory, quantity, variants]);

	const finalQuantity = useMemo(() => {
		if (typeof quantity === "number") {
			return quantity;
		}
		return 1;
	}, [quantity]);

	const decrementQuantity = useCallback(() => {
		setQuantity(prev => {
			if (typeof prev === "number") {
				const newQuantity = prev - 1;
				if (newQuantity <= 0) {
					return prev;
				}
				if (
					!finalVariantInventory ||
					!finalVariantInventory.inventoryTracked ||
					finalVariantInventory.inventoryQuantity >= newQuantity
				) {
					return newQuantity;
				}
				return finalVariantInventory.inventoryQuantity;
			}
			return 0;
		});
	}, [finalVariantInventory]);

	const incrementQuantity = useCallback(() => {
		setQuantity(prev => {
			if (typeof prev === "number") {
				const newQuantity = prev + 1;
				if (
					!finalVariantInventory ||
					!finalVariantInventory.inventoryTracked ||
					finalVariantInventory.inventoryQuantity >= newQuantity
				) {
					return newQuantity;
				}
				return prev;
			}
			return 1;
		});
	}, [finalVariantInventory]);

	const onBlurQuantity = useCallback(() => {
		setQuantity(prev => {
			if (prev === "") {
				return 1;
			}
			if (typeof prev === "number") {
				if (prev <= 0 || !Number.isInteger(prev)) {
					return 1;
				}
				if (
					finalVariantInventory &&
					finalVariantInventory.inventoryTracked &&
					finalVariantInventory.inventoryQuantity < prev
				) {
					return finalVariantInventory.inventoryQuantity;
				}
				return prev;
			}
			return 1;
		});
	}, [finalVariantInventory]);

	const onChangeQuantity = useCallback<ChangeEventHandler<HTMLInputElement>>(
		e => {
			if (e.target.value === "") {
				setQuantity("");
				return;
			}
			const newQuantity = Number(e.target.value);
			if (isNaN(newQuantity) || newQuantity < 0 || !Number.isInteger(newQuantity)) {
				setQuantity(1);
				return;
			}
			if (
				finalVariantInventory &&
				finalVariantInventory.inventoryTracked &&
				finalVariantInventory.inventoryQuantity < newQuantity
			) {
				setQuantity(finalVariantInventory.inventoryQuantity);
				return;
			}
			setQuantity(newQuantity);
		},
		[finalVariantInventory],
	);

	const resetQuantity = useCallback(() => {
		setQuantity(1);
	}, []);

	// --------------------------------
	// ------------ action ------------
	// --------------------------------

	const cartAction = useCallback(() => {
		if (!finalVariant) return;
		resetQuantity();
		addItem(finalVariant, product, finalQuantity);
	}, [finalQuantity, finalVariant, product, resetQuantity, addItem]);

	const onVariantClick = useCallback(() => {
		resetQuantity();
	}, [resetQuantity]);

	useEffect(() => {
		return () => {
			resetProductMessage();
		};
	}, [resetProductMessage]);

	// --------------------------------
	// ------------ return ------------
	// --------------------------------
	return (
		<div className={cn(className)}>
			<ProductVariantSelector
				className="pb-8 lg:pb-16"
				onClick={onVariantClick}
				options={product.options}
				variants={product.variants}
			/>
			<ProductPrice className="mb-8" price={product.priceRange.maxVariantPrice} />
			<ProductCartQuantity
				className="mb-4"
				isPending={isPending}
				decrement={decrementQuantity}
				disableDecrement={disableDecrementQuantity}
				disableIncrement={disableIncrementQuantity}
				increment={incrementQuantity}
				onBlur={onBlurQuantity}
				onChange={onChangeQuantity}
				quantity={quantity}
				variant={finalVariant}
			/>
			<ProductCartAdd
				cartAction={cartAction}
				isPending={isPending}
				product={product}
				selectedVariantId={selectedVariantId}
			/>
			<ProductCartInventory className="mt-12" variantInventory={finalVariantInventory} />
			{!!productMessage && !!finalVariant && productMessage.id === finalVariant.id && (
				<p>{productMessage.message}</p>
			)}
		</div>
	);
}
