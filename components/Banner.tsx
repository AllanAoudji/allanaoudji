"use client";

import { useEffect, useRef, useState } from "react";

type props = {
	banner: string;
	className?: string;
	separator?: string;
	speed?: number;
};

export default function Banner({
	banner,
	className = "",
	separator = " ★ ",
	speed = 80,
}: Readonly<props>) {
	const [duration, setDuration] = useState(10);
	const [repeatCount, setRepeatCount] = useState(4);

	const isPausedRef = useRef<boolean>(false);
	const pausedAtRef = useRef<number>(0);
	const rafRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);
	const stripRef = useRef<HTMLSpanElement>(null);
	const stripWidthRef = useRef<number>(0);
	const trackRef = useRef<HTMLDivElement>(null);
	const unit = `${banner}${separator.replace(/ /g, "\u00A0")}`;
	const viewportRef = useRef<HTMLDivElement>(null);

	const repeatedText = Array(repeatCount).fill(unit).join("");

	const handleMouseEnter = () => {
		isPausedRef.current = true;

		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}

		const track = trackRef.current;
		if (track) {
			const matrix = new DOMMatrix(getComputedStyle(track).transform);
			pausedAtRef.current = Math.abs(matrix.m41);
		}
		startTimeRef.current = null;
	};

	const handleMouseLeave = () => {
		isPausedRef.current = false;
		startTimeRef.current = null;

		const track = trackRef.current;
		if (!track) return;

		const animate = (ts: number) => {
			if (isPausedRef.current) return;

			if (startTimeRef.current === null) {
				startTimeRef.current = ts - (pausedAtRef.current / speed) * 1000;
			}

			const elapsed = (ts - startTimeRef.current) / 1000;
			const px = (elapsed * speed) % stripWidthRef.current;

			track.style.transform = `translate3d(${-px}px, 0, 0)`;
			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		const strip = stripRef.current;
		const viewport = viewportRef.current;
		if (!strip || !viewport) return;

		const recalculate = () => {
			const unitWidth = strip.scrollWidth / repeatCount;
			const viewportWidth = viewport.offsetWidth;

			if (unitWidth === 0) return;

			const neededRepeats = Math.ceil((viewportWidth * 2) / unitWidth) + 2;
			const safeRepeats = Math.max(neededRepeats, 4);
			const stripWidth = unitWidth * safeRepeats;

			stripWidthRef.current = stripWidth;
			setRepeatCount(safeRepeats);
			setDuration(stripWidth / speed);
		};

		const ro = new ResizeObserver(recalculate);
		ro.observe(viewport);
		ro.observe(strip);
		recalculate();
		return () => ro.disconnect();
	}, [banner, repeatCount, separator, speed]);

	useEffect(() => {
		const track = trackRef.current;

		if (!track || stripWidthRef.current === 0) return;

		const animate = (ts: number) => {
			if (isPausedRef.current) return;

			if (startTimeRef.current === null) {
				startTimeRef.current = ts - (pausedAtRef.current / speed) * 1000;
			}

			const elapsed = (ts - startTimeRef.current) / 1000;
			const px = (elapsed * speed) % stripWidthRef.current;

			track.style.transform = `translate3d(${-px}px, 0, 0)`;
			rafRef.current = requestAnimationFrame(animate);
		};

		isPausedRef.current = false;
		rafRef.current = requestAnimationFrame(animate);

		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			startTimeRef.current = null;
		};
	}, [duration, speed]);

	return (
		<div
			className={`bg-tertiary relative w-full overflow-hidden text-xl ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={viewportRef}
		>
			<div
				className="flex w-max py-2"
				ref={trackRef}
				style={{
					backfaceVisibility: "hidden",
					willChange: "transform",
				}}
			>
				<span aria-hidden className="whitespace-nowrap" ref={stripRef}>
					{repeatedText}
				</span>
				<span aria-hidden className="whitespace-nowrap">
					{repeatedText}
				</span>
			</div>

			<span className="sr-only">{banner}</span>
		</div>
	);
}
