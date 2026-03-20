"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { fetchMoreProducts } from "@/lib/actions/fetchMoreProducts";
import Grid from "./Grid";
import ProductLink from "./ProductLink";
import Product from "@/types/product";

type Props = {
	first?: number;
	handle?: string;
	hasNextPage?: boolean;
	initialCursor: string | null;
	initialProducts: Product[];
	reverse: boolean;
	searchValue?: string | string[];
	sortKey: string;
};

export default function ProductsShopSectionInfiniteGrid({
	first = 20,
	handle,
	hasNextPage: initialHasNextPage,
	initialCursor,
	initialProducts,
	reverse,
	searchValue,
	sortKey,
}: Readonly<Props>) {
	const [products, setProducts] = useState<Product[]>(initialProducts);

	const cursorRef = useRef<string | null>(initialCursor ?? null);
	const hasNextPageRef = useRef(initialHasNextPage ?? false);
	const isFetching = useRef(false);
	const loadMore = useRef(() => {});
	const observerRef = useRef<IntersectionObserver | null>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		setProducts(initialProducts);
		cursorRef.current = initialCursor ?? null;
		hasNextPageRef.current = initialHasNextPage ?? false;
		isFetching.current = false;

		if (hasNextPageRef.current && observerRef.current && sentinelRef.current) {
			observerRef.current.observe(sentinelRef.current);
		}
	}, [initialCursor, initialHasNextPage, initialProducts]);

	useEffect(() => {
		loadMore.current = () => {
			if (!hasNextPageRef.current || !cursorRef.current || isFetching.current) return;

			isFetching.current = true;

			// 🔑 Couper l'observer immédiatement et synchronement
			if (sentinelRef.current && observerRef.current) {
				observerRef.current.unobserve(sentinelRef.current);
			}

			startTransition(() => {
				fetchMoreProducts({
					after: cursorRef.current!,
					first,
					handle,
					reverse,
					searchValue: typeof searchValue === "string" ? searchValue : undefined,
					sortKey,
				})
					.then(result => {
						if (!result) return;

						setProducts(prev => [...prev, ...result.products]);
						cursorRef.current = result.pageInfo.endCursor ?? null;
						hasNextPageRef.current = result.pageInfo.hasNextPage ?? false;
					})
					.catch(console.error)
					.finally(() => {
						isFetching.current = false;

						if (hasNextPageRef.current && sentinelRef.current && observerRef.current) {
							observerRef.current.observe(sentinelRef.current);
						}
					});
			});
		};
	}, [first, handle, reverse, sortKey, searchValue]);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		observerRef.current = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					loadMore.current();
				}
			},
			{ rootMargin: "400px" },
		);

		observerRef.current.observe(sentinel);

		return () => {
			observerRef.current?.disconnect();
			observerRef.current = null;
		};
	}, []);

	return (
		<>
			<Grid>
				{products.map(product => (
					<ProductLink key={product.id} product={product} />
				))}
			</Grid>

			<div ref={sentinelRef} aria-hidden="true" />

			{isPending && (
				<div className="flex justify-center py-8">
					<span className="text-quaternary text-sm">Chargement...</span>
				</div>
			)}

			{!hasNextPageRef.current && products.length > 0 && (
				<p className="text-quaternary/75 py-8 text-center text-sm">Tous les produits sont affichés</p>
			)}
		</>
	);
}
