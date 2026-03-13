"use client";

import Link from "next/link";
import { useModal } from "@/lib/contexts/modal-context";
import CartEmptyPopularProducts from "./CartEmptyPopularProducts";
import CartModalCloseButton from "./CartModalCloseButton";
import Title from "./Title";

export default function CartEmpty() {
	const { closeModal } = useModal();

	return (
		<div className="flex h-screen flex-col">
			<div className="px-4">
				<CartModalCloseButton />
				<Title>Votre panier est vide</Title>
			</div>
			<div className="flex-1 flex-col gap-4 overflow-y-auto px-4 pb-16">
				<CartEmptyPopularProducts />
				<Link
					className="bg-quaternary text-primary hover:bg-primary hover:text-quaternary mt-12 block border px-8 py-3 text-center tracking-wider uppercase transition-colors"
					href="/collections"
					onClick={closeModal}
				>
					Continuez les achats
				</Link>
			</div>
		</div>
	);
}
