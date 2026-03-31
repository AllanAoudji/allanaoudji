"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { fetchMoreProducts } from "@/lib/actions/fetchMoreProducts";
import { FETCH_PRODUCTS } from "@/lib/constants";
import InfiniteSpinner from "./InfiniteSpinner";
import ProductLink from "./ProductLink";
import Product from "@/types/product";

type Props = {
	handle?: string;
	hasNextPage?: boolean;
	initialCursor: string | null;
	initialProducts: Product[];
	reverse: boolean;
	searchValue?: string | string[];
	sortKey: string;
};

export default function CollectionsContentInfiniteScroll({
	handle,
	hasNextPage: initialHasNextPage,
	initialCursor,
	initialProducts,
	reverse,
	searchValue,
	sortKey,
}: Readonly<Props>) {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>(initialProducts);

	const cursorRef = useRef<string | null>(initialCursor ?? null);
	const hasNextPageRef = useRef(initialHasNextPage ?? false);
	const isFetching = useRef(false);
	const loadMore = useRef(() => {});
	const observerRef = useRef<IntersectionObserver | null>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const [, startTransition] = useTransition();

	useEffect(() => {
		if (products.length === 0) {
			setProducts(initialProducts);
			cursorRef.current = initialCursor ?? null;
			hasNextPageRef.current = initialHasNextPage ?? false;
			isFetching.current = false;

			if (hasNextPageRef.current && observerRef.current && sentinelRef.current) {
				observerRef.current.observe(sentinelRef.current);
			}
		}
	}, [initialCursor, initialHasNextPage, initialProducts, products]);

	useEffect(() => {
		loadMore.current = () => {
			if (!hasNextPageRef.current || !cursorRef.current || isFetching.current) return;

			isFetching.current = true;
			setIsLoading(true);

			if (sentinelRef.current && observerRef.current) {
				observerRef.current.unobserve(sentinelRef.current);
			}

			startTransition(() => {
				fetchMoreProducts({
					after: cursorRef.current!,
					first: FETCH_PRODUCTS,
					handle,
					reverse,
					searchValue: typeof searchValue === "string" ? searchValue : undefined,
					sortKey,
				})
					.then(result => {
						if (!result) return;

						setProducts(prev => [...prev, ...(result.products || [])]);
						cursorRef.current = result.pageInfo.endCursor ?? null;
						hasNextPageRef.current = result.pageInfo.hasNextPage ?? false;
					})
					.catch(console.error)
					.finally(() => {
						isFetching.current = false;
						setIsLoading(false);

						if (hasNextPageRef.current && sentinelRef.current && observerRef.current) {
							observerRef.current.observe(sentinelRef.current);
						}
					});
			});
		};
	}, [handle, reverse, searchValue, sortKey]);

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
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{products.map(product => (
					<ProductLink key={product.id} product={product} />
				))}
			</div>

			<div aria-hidden="true" ref={sentinelRef} />

			<InfiniteSpinner isLoading={isLoading} />
		</>
	);
}
