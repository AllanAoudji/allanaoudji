// HomeSections.tsx
import React from "react";

export default function HomeSections({ children }: { children: React.ReactNode[] }) {
	// Filtre les enfants non-nuls (ceux qui ont rendu sans erreur)
	const validChildren = React.Children.toArray(children).filter(Boolean);

	return (
		<div>
			{validChildren.map((child, index) => (
				<div
					key={index}
					className={`${index % 2 === 0 ? "bg-secondary text-primary" : "bg-primary text-secondary"}`}
				>
					{child}
				</div>
			))}
		</div>
	);
}
