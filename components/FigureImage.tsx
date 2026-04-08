// À ajouter dans le fichier, entre les fonctions utilitaires et `components`
import { useEffect, useRef, useState } from "react";

type Props = {
	src: string;
	srcSet: string;
	alt: string;
	lqip?: string | null;
};

export function FigureImage({ src, srcSet, alt, lqip }: Readonly<Props>) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imgRef.current?.complete) setLoaded(true);
	}, []);

	return (
		<>
			{/* Blur placeholder */}
			{lqip && (
				<div
					className="absolute inset-0 bg-cover bg-center blur-xl transition-opacity duration-700"
					style={{
						backgroundImage: `url(${lqip})`,
						opacity: loaded ? 0 : 1,
					}}
				/>
			)}

			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				ref={imgRef}
				alt={alt}
				className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
				decoding="async"
				loading="lazy"
				sizes="(max-width: 768px) 100vw, 70vw"
				src={src}
				srcSet={srcSet}
				style={{ opacity: loaded ? 1 : 0 }}
				onLoad={() => setLoaded(true)}
			/>
		</>
	);
}
