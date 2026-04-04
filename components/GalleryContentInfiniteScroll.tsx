"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useRef, useState, useTransition } from "react";
import { fetchMoreWorks } from "@/lib/actions/fetchMoreWorks";
import { FETCH_WORKS_GALLERY } from "@/lib/constants";
import { useLightBox } from "@/lib/contexts/lightbox-context";
import GalleryContentInfiniteScrollItem from "./GalleryContentInfiniteScrollItem";
import InfiniteSpinner from "./InfiniteSpinner";
import { Works } from "@/types/sanityType";

type Props = {
	initialTotal: number;
	initialWorks: Works;
};

const getLightBoxImages = (works: Works) => {
	if (!works) return [];
	return works.flatMap(work => work.gallery || []);
};

export default function GalleryContentInfiniteScroll({
	initialTotal,
	initialWorks,
}: Readonly<Props>) {
	const { appendImages } = useLightBox();

	const [isLoading, setIsLoading] = useState(false);
	const [works, setWorks] = useState<Works>(initialWorks);

	const fromRef = useRef(FETCH_WORKS_GALLERY);
	const hasNextPageRef = useRef(FETCH_WORKS_GALLERY < initialTotal);
	const isFetching = useRef(false);
	const loadMore = useRef(() => {});
	const observerRef = useRef<IntersectionObserver | null>(null);
	const prevWorksLengthRef = useRef(initialWorks?.length ?? 0);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const [, startTransition] = useTransition();

	useEffect(() => {
		if (!works || works.length <= prevWorksLengthRef.current) return;

		const newWorks = works.slice(prevWorksLengthRef.current);
		appendImages(getLightBoxImages(newWorks));
		prevWorksLengthRef.current = works.length;
	}, [works, appendImages]);

	useEffect(() => {
		loadMore.current = () => {
			if (!hasNextPageRef.current || isFetching.current) return;

			isFetching.current = true;
			setIsLoading(true);

			if (sentinelRef.current && observerRef.current) {
				observerRef.current.unobserve(sentinelRef.current);
			}

			const from = fromRef.current;
			const to = from + FETCH_WORKS_GALLERY;

			startTransition(() => {
				fetchMoreWorks({ from, to })
					.then(result => {
						const data = result.data;
						if (!data || !data.works?.length) return;

						setWorks(prev => [...prev, ...(data.works ?? [])]);
						fromRef.current = to;
						hasNextPageRef.current = to < (data.total ?? 0);
					})
					.catch(error => {
						Sentry.captureException(error, {
							extra: {
								context: "Failed to fetch more works",
								from: fromRef.current,
								to: fromRef.current + FETCH_WORKS_GALLERY,
							},
						});
					})
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
				<GalleryContentInfiniteScrollItem key={work._id} work={work} />
			))}

			<div aria-hidden="true" ref={sentinelRef} />

			<InfiniteSpinner isLoading={isLoading} />
		</>
	);
}
