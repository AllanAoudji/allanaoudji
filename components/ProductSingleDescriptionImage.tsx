import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ShopifyImageProps = {
	src: string;
	srcSet: string;
	alt: string;
	floatClass: string;
};

export function ProductSingleDescriptionImage({ src, srcSet, alt, floatClass }: ShopifyImageProps) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imgRef.current?.complete) setLoaded(true);
	}, []);

	return (
		<figure className={cn(floatClass, "relative w-full")}>
			<div className="bg-quaternary relative w-full" style={{ aspectRatio: "4 / 3" }}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					ref={imgRef}
					alt={alt}
					className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
					decoding="async"
					loading="lazy"
					sizes="(max-width: 768px) 100vw, 70vw"
					src={src}
					srcSet={srcSet}
					style={{ opacity: loaded ? 1 : 0 }}
					onLoad={() => setLoaded(true)}
				/>
			</div>
			{alt && <figcaption className="editorial-caption">{alt}</figcaption>}
		</figure>
	);
}
