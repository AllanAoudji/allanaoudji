import { applyFrenchTypography, cn } from "@/lib/utils";

type Props = {
	className?: string;
	text: string | null;
};

export default function GalleryText({ className, text }: Readonly<Props>) {
	if (!text) return null;
	const paragraphs = applyFrenchTypography(text).split("\n").filter(Boolean) ?? [];
	return (
		<div className={cn("pb-4 text-sm leading-4.5 tracking-[0.01em]", className)}>
			{paragraphs.map((paragraph, index) => (
				<p key={index} className={index === 0 ? "" : "indent-8"}>
					{paragraph}
				</p>
			))}
		</div>
	);
}
