"use client";

import { useEffect, useRef, useState } from "react";

type props = {
	banner: string;
	className?: string;
	speed?: number;
	separator?: string;
};

export default function Banner({
	banner,
	className = "",
	speed = 80,
	separator = " ★ ",
}: Readonly<props>) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const stripRef = useRef<HTMLSpanElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	const [repeatCount, setRepeatCount] = useState(4);
	const [duration, setDuration] = useState(10); // kept only to trigger rAF effect re-run

	const rafRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);
	const pausedAtRef = useRef<number>(0); // exact px when paused
	const stripWidthRef = useRef<number>(0);
	const isPausedRef = useRef<boolean>(false);

	const unit = `${banner}${separator.replace(/ /g, "\u00A0")}`;
	// const unit = banner + separator;

	// ─── Measurement ────────────────────────────────────────────────────────────
	useEffect(() => {
		const viewport = viewportRef.current;
		const strip = stripRef.current;
		if (!viewport || !strip) return;

		const recalculate = () => {
			const viewportWidth = viewport.offsetWidth;
			const unitWidth = strip.scrollWidth / repeatCount;
			if (unitWidth === 0) return;

			const neededRepeats = Math.ceil((viewportWidth * 2) / unitWidth) + 2;
			const safeRepeats = Math.max(neededRepeats, 4);
			const stripWidth = unitWidth * safeRepeats;

			stripWidthRef.current = stripWidth;
			setRepeatCount(safeRepeats);
			setDuration(stripWidth / speed); // triggers rAF effect
		};

		const ro = new ResizeObserver(recalculate);
		ro.observe(viewport);
		ro.observe(strip);
		recalculate();
		return () => ro.disconnect();
	}, [banner, separator, speed, repeatCount]);

	// ─── rAF animation loop ──────────────────────────────────────────────────────
	useEffect(() => {
		const track = trackRef.current;
		if (!track || stripWidthRef.current === 0) return;

		const animate = (ts: number) => {
			if (isPausedRef.current) return; // safety guard

			if (startTimeRef.current === null) {
				// Re-anchor: continue from wherever we paused
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
	}, [duration, speed]); // re-run when strip geometry changes

	// ─── Hover handlers ──────────────────────────────────────────────────────────
	const handleMouseEnter = () => {
		isPausedRef.current = true;

		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}

		// Capture the exact current pixel position from the live transform
		const track = trackRef.current;
		if (track) {
			const matrix = new DOMMatrix(getComputedStyle(track).transform);
			pausedAtRef.current = Math.abs(matrix.m41); // translateX is negative
		}
		startTimeRef.current = null; // will re-anchor on resume
	};

	const handleMouseLeave = () => {
		isPausedRef.current = false;
		startTimeRef.current = null; // re-anchor from pausedAtRef on next frame

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

	const repeatedText = Array(repeatCount).fill(unit).join("");

	return (
		<div
			ref={viewportRef}
			className={`bg-secondary relative w-full overflow-hidden text-xl ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={trackRef}
				className="flex w-max py-2"
				style={{
					willChange: "transform",
					backfaceVisibility: "hidden", // force GPU compositing layer
				}}
			>
				<span ref={stripRef} aria-hidden className="whitespace-nowrap">
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
