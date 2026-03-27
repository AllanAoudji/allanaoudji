"use client";

import { PortableText, PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import imageUrlBuilder, { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import { applyFrenchTypography, cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

// ─── IMAGE URL BUILDER ────────────────────────────────────────────────────────

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const LINK_MARK_TYPES = new Set(["link", "linkPhone", "linkEmail"]);

/* Retourne true si le bloc est un <p> vide */
function isEmptyBlock(block: PortableTextBlock): boolean {
	if (block._type !== "block") return false;
	if (!block.children?.length) return true;
	return block.children.every(
		child => child._type === "span" && (!child.text || child.text.trim() === ""),
	);
}

/* Déduplique les annotations de type lien — priorité : linkEmail > linkPhone > link */
function deduplicateLinkMarks(blocks: PortableTextBlock[]): PortableTextBlock[] {
	return blocks.map(block => {
		if (block._type !== "block" || !block.children) return block;

		const children = block.children.map(child => {
			if (!child.marks || child.marks.length <= 1) return child;

			const markDefs: Record<string, string> = {};
			(block.markDefs ?? []).forEach((def: { _key: string; _type: string }) => {
				markDefs[def._key] = def._type;
			});

			const linkMarks = child.marks.filter((m: string) => LINK_MARK_TYPES.has(markDefs[m] ?? m));

			if (linkMarks.length <= 1) return child;

			const priority = ["linkEmail", "linkPhone", "link"];
			const kept = linkMarks.sort(
				(a: string, b: string) =>
					priority.indexOf(markDefs[a] ?? a) - priority.indexOf(markDefs[b] ?? b),
			)[0];

			return {
				...child,
				marks: child.marks.filter((m: string) => !linkMarks.includes(m) || m === kept),
			};
		});

		return { ...block, children };
	});
}

/* Applique la typographie française sur tous les spans texte */
function applyTypography(blocks: PortableTextBlock[]): PortableTextBlock[] {
	return blocks.map(block => {
		if (block._type !== "block" || !block.children) return block;

		const children = block.children.map(child => {
			if (child._type !== "span" || !child.text) return child;
			return { ...child, text: applyFrenchTypography(child.text) };
		});

		return { ...block, children };
	});
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type FigureBlock = {
	_type: "figure";
	image: SanityImageSource & {
		width?: number;
		height?: number;
		lqip?: string;
	};
	alt?: string;
	caption?: string;
};

type TableRow = {
	_key: string;
	isHeader?: boolean;
	cells: string[];
};

type TableBlock = {
	_type: "table";
	caption?: string;
	rows: TableRow[];
};

type CalloutBlock = {
	_type: "callout";
	tone?: "info" | "warning" | "danger";
	text: string;
};

type Props = {
	className?: string;
	value: unknown[];
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const components: PortableTextComponents = {
	hardBreak: () => (
		<>
			<br />
			<span style={{ display: "inline-block", width: "1.2em" }} />
		</>
	),

	block: {
		normal: ({ children }) => <p className="editorial-p">{children}</p>,
		h1: ({ children }) => <h1 className="editorial-h1">{children}</h1>,
		h2: ({ children }) => <h2 className="editorial-h2">{children}</h2>,
		h3: ({ children }) => <h3 className="editorial-h3">{children}</h3>,
		blockquote: ({ children }) => (
			<blockquote className="editorial-blockquote">{children}</blockquote>
		),
	},

	list: {
		bullet: ({ children }) => <ul className="editorial-ul">{children}</ul>,
		number: ({ children }) => <ol className="editorial-ol">{children}</ol>,
	},
	listItem: {
		bullet: ({ children }) => <li>{children}</li>,
		number: ({ children }) => <li>{children}</li>,
	},

	marks: {
		strong: ({ children }) => <strong>{children}</strong>,
		em: ({ children }) => <em>{children}</em>,
		underline: ({ children }) => <span className="underline">{children}</span>,
		code: ({ children }) => <code className="editorial-code">{children}</code>,

		link: ({ value, children }) => (
			<a
				href={value?.href}
				target={value?.blank ? "_blank" : undefined}
				rel={value?.blank ? "noopener noreferrer" : undefined}
				className="editorial-link"
			>
				{children}
			</a>
		),

		linkPhone: ({ value, children }) => (
			<a href={`tel:${value?.phone}`} className="editorial-link">
				{children}
			</a>
		),

		linkEmail: ({ value, children }) => (
			<a href={`mailto:${value?.email}`} className="editorial-link">
				{children}
			</a>
		),
	},

	types: {
		figure: ({ value }: { value: FigureBlock }) => {
			if (!value.image) return null;
			const w = value.image.width ?? 900;
			const h = value.image.height ?? 700;
			const src = urlFor(value.image).width(w).auto("format").url();
			const lqip = value.image.lqip;

			return (
				<figure className="editorial-figure">
					<div className="bg-quaternary relative w-full" style={{ aspectRatio: `${w}/${h}` }}>
						<Image
							src={src}
							alt={value.alt ?? ""}
							fill
							className="h-auto object-cover"
							sizes="(max-width: 768px) 100vw, 70vw"
							placeholder={lqip ? "blur" : "empty"}
							blurDataURL={lqip ?? undefined}
						/>
					</div>
					{value.caption && <figcaption className="editorial-caption">{value.caption}</figcaption>}
				</figure>
			);
		},

		table: ({ value }: { value: TableBlock }) => (
			<div className="editorial-table-wrapper">
				{value.caption && <p className="editorial-table-caption">{value.caption}</p>}
				<table>
					{value.rows?.map(row =>
						row.isHeader ? (
							<thead key={row._key}>
								<tr>
									{row.cells?.map((cell, i) => (
										<th key={i}>{cell}</th>
									))}
								</tr>
							</thead>
						) : (
							<tbody key={row._key}>
								<tr>
									{row.cells?.map((cell, i) => (
										<td key={i}>{cell}</td>
									))}
								</tr>
							</tbody>
						),
					)}
				</table>
			</div>
		),

		callout: ({ value }: { value: CalloutBlock }) => (
			<div className={cn("editorial-callout", `editorial-callout--${value.tone ?? "info"}`)}>
				{value.text}
			</div>
		),
	},
};

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

export default function PortableTextContent({ className, value }: Readonly<Props>) {
	if (!value?.length) return null;

	const processed = applyTypography(
		deduplicateLinkMarks((value as PortableTextBlock[]).filter(block => !isEmptyBlock(block))),
	);

	if (!processed.length) return null;

	return (
		<div className={cn("editorial-root editorial-columns", className)}>
			<PortableText value={processed as never} components={components} />
		</div>
	);
}
