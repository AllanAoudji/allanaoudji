"use client";

import createDOMPurify from "dompurify";
import parse, {
	domToReact,
	HTMLReactParserOptions,
	Element,
	DOMNode,
	Text,
} from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fragment, isValidElement, ReactElement, ReactNode } from "react";
import { applyFrenchTypography, cn } from "@/lib/utils";

type Props = { className?: string; html: string };

/* Type guard — seul h1 découpe en sections */
function isSectionHeading(node: ReactNode): node is ReactElement {
	return isValidElement(node) && typeof node.type === "string" && node.type === "h1";
}

export default function ProductDescription({ className, html }: Readonly<Props>) {
	const [content, setContent] = useState<React.ReactNode | null>(null);

	useEffect(() => {
		if (!html) return;

		const DOMPurify = createDOMPurify(window);
		const sanitized = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

		const tmp = document.createElement("div");
		tmp.innerHTML = sanitized;

		// Supprimer toutes les classes et ids
		tmp.querySelectorAll("[class], [id]").forEach(el => {
			el.removeAttribute("class");
			el.removeAttribute("id");
		});

		// Stripper les styles inline sur les tableaux
		tmp.querySelectorAll("table, thead, tbody, tfoot, tr, th, td").forEach(el => {
			el.removeAttribute("style");
			el.removeAttribute("width");
			el.removeAttribute("height");
		});

		// Déplacer <figure> et <img> hors de <p>
		tmp.querySelectorAll("p figure, p img").forEach(el => {
			const p = el.closest("p");
			if (!p || !p.parentNode) return;
			p.parentNode.insertBefore(el, p);
			if (!p.textContent?.trim() && !p.children.length) p.remove();
		});

		// Supprimer les <p> vides
		tmp.querySelectorAll("p").forEach(p => {
			if (!p.textContent?.trim() && !p.children.length) p.remove();
		});

		// Déballe un éventuel div wrapper racine unique
		const root =
			tmp.children.length === 1 && tmp.children[0].tagName === "DIV" ? tmp.children[0] : tmp;

		const cleanHtml = root.innerHTML;

		const options: HTMLReactParserOptions = {
			replace: (node: DOMNode) => {
				/* NŒUDS TEXTE — typographie française */
				if (node.type === "text") {
					const textNode = node as Text;
					const processed = applyFrenchTypography(textNode.data);
					if (processed === textNode.data) return;
					return <>{processed}</>;
				}

				if (!(node instanceof Element)) return;

				const { name, attribs, children } = node;
				const style = attribs?.style ?? "";

				/* ALIGNEMENT */
				const alignMatch = style.match(/text-align:\s*(left|center|right)/);
				if (alignMatch) {
					const align = alignMatch[1] as "left" | "center" | "right";
					return <div className={`text-${align}`}>{domToReact(children as DOMNode[], options)}</div>;
				}

				/* COULEURS */
				const colorMatch = style.match(/color:\s*([^;]+)/);
				if (colorMatch) {
					const colorValue = colorMatch[1].trim().toLowerCase();
					const isBlack = ["#000", "#000000", "black", "rgb(0,0,0)"].includes(colorValue);
					if (isBlack) {
						return <span className="text-quaternary">{domToReact(children as DOMNode[], options)}</span>;
					}
					return undefined;
				}

				/* IMAGES */
				if (name === "img") {
					const src = attribs?.src;
					const alt = attribs?.alt ?? "";
					if (!src) return;

					const floatMatch = style.match(/float:\s*(left|right)/);
					let floatClass = "";
					if (floatMatch) {
						const direction = floatMatch[1];
						if (direction === "left") floatClass = "float-left";
						if (direction === "right") floatClass = "float-right";
					}

					return (
						<figure className={floatClass}>
							<Image src={src} alt={alt} width={900} height={700} className="h-auto w-full object-cover" />
							{alt && <figcaption className="editorial-caption">{alt}</figcaption>}
						</figure>
					);
				}

				/* TABLEAUX */
				if (name === "table") {
					return (
						<div className="editorial-table-wrapper">
							<table>{domToReact(children as DOMNode[], options)}</table>
						</div>
					);
				}

				/* LIENS */
				if (name === "a") {
					const href = attribs?.href;
					if (!href) return;
					return (
						<a href={href} target="_blank" rel="noopener noreferrer" className="editorial-link">
							{domToReact(children as DOMNode[], options)}
						</a>
					);
				}

				return undefined;
			},
		};

		const parsedNodes = parse(cleanHtml, options);
		const nodesArray: React.ReactNode[] = Array.isArray(parsedNodes) ? parsedNodes : [parsedNodes];

		// Découpe en sections sur h1 uniquement
		type Section = { nodes: ReactNode[] };
		const sections: Section[] = [];
		let current: Section = { nodes: [] };

		nodesArray.forEach(node => {
			if (typeof node === "string" && node.trim().length === 0) return;

			if (isSectionHeading(node)) {
				if (current.nodes.length) sections.push(current);
				current = { nodes: [node] };
			} else {
				current.nodes.push(node);
			}
		});
		if (current.nodes.length) sections.push(current);

		const filteredSections = sections.filter(s => s.nodes.length > 0);

		setContent(
			<div className="editorial-root">
				{filteredSections.map((section, i) => (
					<section key={i} className="editorial-section">
						{section.nodes.map((child, j) => (
							<Fragment key={j}>{child}</Fragment>
						))}
					</section>
				))}
			</div>,
		);
	}, [html]);

	return <div className={cn(className)}>{content}</div>;
}
