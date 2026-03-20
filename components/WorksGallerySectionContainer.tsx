"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { fetchMoreWorks } from "@/lib/actions/fetchMoreWorks";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import WorksGallerySectionContainerItem from "./WorksGallerySectionContainerItem";
import { works } from "@/types/sanityType";

const FETCH_SIZE = 5;

type Props = {
	initialWorks: works;
	initialTotal: number;
	initialFrom: number;
};

const getLightBoxImages = (works: works) => {
	if (!works) return [];
	return works.flatMap(work => work.gallery || []);
};

export default function WorksGallerySectionContainer({
	initialWorks,
	initialTotal,
	initialFrom,
}: Readonly<Props>) {
	const [works, setWorks] = useState<works>(initialWorks);
	const fromRef = useRef(initialFrom);
	const hasNextPageRef = useRef(initialFrom < initialTotal);
	const sentinelRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const isFetching = useRef(false);
	const [isPending, startTransition] = useTransition();

	const { updateImages, resetImages } = useLightBox();

	// 🔑 Sync lightbox avec tous les works chargés
	useEffect(() => {
		updateImages(getLightBoxImages(works));
	}, [works, updateImages]);

	useEffect(() => {
		return () => resetImages();
	}, [resetImages]);

	const loadMore = useRef(() => {});

	useEffect(() => {
		loadMore.current = () => {
			if (!hasNextPageRef.current || isFetching.current) return;

			isFetching.current = true;

			if (sentinelRef.current && observerRef.current) {
				observerRef.current.unobserve(sentinelRef.current);
			}

			const from = fromRef.current;
			const to = from + FETCH_SIZE;

			startTransition(() => {
				fetchMoreWorks({ from, to })
					.then(result => {
						if (!result || !result.works?.length) return;

						setWorks(prev => [...prev, ...(result.works || [])]);
						fromRef.current = to;
						hasNextPageRef.current = to < (result.total ?? 0);
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
	}, []);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		observerRef.current = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) loadMore.current();
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
			{works.map(work => (
				<WorksGallerySectionContainerItem key={work._id} work={work} />
			))}

			<div ref={sentinelRef} aria-hidden="true" />

			{isPending && (
				<div className="flex justify-center py-8">
					<span className="text-sm text-gray-500">Chargement...</span>
				</div>
			)}

			{!hasNextPageRef.current && works.length > 0 && (
				<p className="py-8 text-center text-sm text-gray-400">Tous les works sont affichés</p>
			)}
		</>
	);
}
