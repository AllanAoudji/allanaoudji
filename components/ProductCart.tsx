"use client";

import {
	ChangeEventHandler,
	useActionState,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import addItem from "@/lib/actions/addItem";
import { useCart } from "@/lib/contexts/cart-context";
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
	const { addCartItem } = useCart();

	const [addToCartPending, setAddToCartPending] = useState(false);
	const [quantity, setQuantity] = useState<number | string>(1);
	const [showCallbackMessage, setShowCallbackMessage] = useState(false);

	const [message, formAction, isPending] = useActionState(addItem, null);

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
		return variant?.id || defaultVariantId;
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
	const actionWithVariant = useMemo(() => {
		return formAction.bind(null, { selectedVariantId, quantity: finalQuantity, type: "ADD" });
	}, [finalQuantity, formAction, selectedVariantId]);

	const cartAction = useCallback(() => {
		if (!finalVariant) return;
		resetQuantity();
		addCartItem(finalVariant, product, finalQuantity);
		actionWithVariant();
		setShowCallbackMessage(true);
	}, [addCartItem, actionWithVariant, finalQuantity, finalVariant, product, resetQuantity]);

	const resetForm = useCallback(() => {
		setShowCallbackMessage(false);
	}, []);

	const onClickAddToCart = useCallback(() => {
		setAddToCartPending(true);
	}, []);

	const onVariantClick = useCallback(() => {
		resetForm();
		resetQuantity();
	}, [resetForm, resetQuantity]);

	// --------------------------------
	// ----------- effects ------------
	// --------------------------------
	useEffect(() => {
		if (!isPending) {
			setAddToCartPending(false);
		}
	}, [isPending]);

	useLayoutEffect(() => {
		return () => {
			resetForm();
		};
	}, [resetForm]);

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
				disableButton={isPending}
				isPending={addToCartPending}
				message={message}
				onClick={onClickAddToCart}
				product={product}
				selectedVariantId={selectedVariantId}
				showMessage={showCallbackMessage}
			/>
			<ProductCartInventory className="mt-12" variantInventory={finalVariantInventory} />
		</div>
	);
}
