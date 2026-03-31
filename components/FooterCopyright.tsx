"use client";

export default function FooterCopyright() {
	const currentYear = new Date().getFullYear();
	const year = currentYear === 2025 ? "2026" : `2026 - ${currentYear}`;

	return <p className="pt-4 text-center text-xs italic">Allan Aoudji @ {year}</p>;
}
