"use client";

import createDOMPurify from "dompurify";
import parse, {
	domToReact,
	HTMLReactParserOptions,
	Element,
	DOMNode,
	Text,
} from "html-react-parser";
import { useEffect, useState } from "react";
import { Fragment, isValidElement, ReactElement, ReactNode } from "react";
import { applyFrenchTypography, cn } from "@/lib/utils";
import { ProductSingleDescriptionImage } from "./ProductSingleDescriptionImage";

type Props = { className?: string; html: string };

function isSectionHeading(node: ReactNode): node is ReactElement {
	return isValidElement(node) && typeof node.type === "string" && node.type === "h1";
}

export default function ProductSingleDescription({ className, html }: Readonly<Props>) {
	const [content, setContent] = useState<React.ReactNode | null>(null);

	useEffect(() => {
		if (!html) return;

		const DOMPurify = createDOMPurify(window);
		const sanitized = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

		const tmp = document.createElement("div");
		tmp.innerHTML = sanitized;

		tmp.querySelectorAll("[class], [id]").forEach(el => {
			el.removeAttribute("class");
			el.removeAttribute("id");
		});

		tmp.querySelectorAll("table, thead, tbody, tfoot, tr, th, td").forEach(el => {
			el.removeAttribute("style");
			el.removeAttribute("width");
			el.removeAttribute("height");
		});

		tmp.querySelectorAll("p figure, p img").forEach(el => {
			const p = el.closest("p");
			if (!p || !p.parentNode) return;
			p.parentNode.insertBefore(el, p);
			if (!p.textContent?.trim() && !p.children.length) p.remove();
		});

		tmp.querySelectorAll("p").forEach(p => {
			if (!p.textContent?.trim() && !p.children.length) p.remove();
		});

		const root =
			tmp.children.length === 1 && tmp.children[0].tagName === "DIV" ? tmp.children[0] : tmp;

		const cleanHtml = root.innerHTML;

		const options: HTMLReactParserOptions = {
			replace: (node: DOMNode) => {
				if (node.type === "text") {
					const textNode = node as Text;
					const processed = applyFrenchTypography(textNode.data);
					if (processed === textNode.data) return;
					return <>{processed}</>;
				}

				if (!(node instanceof Element)) return;

				const { name, attribs, children } = node;
				const style = attribs?.style ?? "";

				const alignMatch = style.match(/text-align:\s*(left|center|right)/);
				if (alignMatch) {
					const align = alignMatch[1] as "left" | "center" | "right";
					return <div className={`text-${align}`}>{domToReact(children as DOMNode[], options)}</div>;
				}

				const colorMatch = style.match(/color:\s*([^;]+)/);
				if (colorMatch) {
					const colorValue = colorMatch[1].trim().toLowerCase();
					const isBlack = ["#000", "#000000", "black", "rgb(0,0,0)"].includes(colorValue);
					if (isBlack) {
						return <span className="text-secondary">{domToReact(children as DOMNode[], options)}</span>;
					}
					return undefined;
				}

				if (name === "img") {
					const src = attribs?.src;
					const alt = attribs?.alt ?? "";
					if (!src) return;

					const floatMatch = style.match(/float:\s*(left|right)/);
					const floatClass = floatMatch ? (floatMatch[1] === "left" ? "float-left" : "float-right") : "";

					const sep = src.includes("?") ? "&" : "?";
					const srcSet = [320, 480, 640, 768, 960, 1200]
						.map(w => `${src}${sep}width=${w} ${w}w`)
						.join(", ");
					const finalSrc = `${src}${sep}width=960`;

					return (
						<ProductSingleDescriptionImage
							alt={alt}
							floatClass={floatClass}
							src={finalSrc}
							srcSet={srcSet}
						/>
					);
				}

				if (name === "table") {
					return (
						<div className="editorial-table-wrapper">
							<table>{domToReact(children as DOMNode[], options)}</table>
						</div>
					);
				}

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
					<section className="editorial-section" key={i}>
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
