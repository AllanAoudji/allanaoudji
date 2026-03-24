"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { fetchMoreWorks } from "@/lib/actions/fetchMoreWorks";
import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import WorksGallerySectionContainerItem from "./WorksGallerySectionContainerItem";
import { works } from "@/types/sanityType";

const FETCH_SIZE = 1;

type Props = {
	initialTotal: number;
	initialWorks: works;
};

const getLightBoxImages = (works: works) => {
	if (!works) return [];
	return works.flatMap(work => work.gallery || []);
};

export default function WorksGallerySectionContainer({
	initialWorks,
	initialTotal,
}: Readonly<Props>) {
	const [isLoading, setIsLoading] = useState(false);
	const [works, setWorks] = useState<works>(initialWorks);

	const fromRef = useRef(FETCH_WORKS_GALLERY);
	const hasNextPageRef = useRef(FETCH_WORKS_GALLERY < initialTotal);
	const isFetching = useRef(false);
	const loadMore = useRef(() => {});
	const observerRef = useRef<IntersectionObserver | null>(null);
	const prevWorksLengthRef = useRef(initialWorks?.length ?? 0);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const [, startTransition] = useTransition();

	const { appendImages, resetImages } = useLightBox();

	useEffect(() => {
		appendImages(getLightBoxImages(initialWorks));
	}, [appendImages, initialWorks]);

	useEffect(() => {
		if (!works || works.length <= prevWorksLengthRef.current) return;

		const newWorks = works.slice(prevWorksLengthRef.current);
		appendImages(getLightBoxImages(newWorks));
		prevWorksLengthRef.current = works.length;
	}, [works, appendImages]);

	useEffect(() => {
		return () => resetImages();
	}, [resetImages]);

	useEffect(() => {
		loadMore.current = () => {
			if (!hasNextPageRef.current || isFetching.current) return;

			isFetching.current = true;
			setIsLoading(true);

			if (sentinelRef.current && observerRef.current) {
				observerRef.current.unobserve(sentinelRef.current);
			}

			const from = fromRef.current;
			const to = from + FETCH_SIZE;

			startTransition(() => {
				fetchMoreWorks({ from, to })
					.then(result => {
						if (!result || !result.works?.length) return;

						setWorks(prev => [...prev, ...(result.works ?? [])]);
						fromRef.current = to;
						hasNextPageRef.current = to < (result.total ?? 0);
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

			{isLoading && (
				<div className="flex justify-center pt-16">
					<span className="text-quaternary/75 text-xs">Chargement...</span>
				</div>
			)}
		</>
	);
}
