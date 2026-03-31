import React from "react";

type Props = {
	children: React.ReactNode[];
};

export default function HomeSections({ children }: Readonly<Props>) {
	const validChildren = React.Children.toArray(children).filter(Boolean);

	return (
		<div>
			{validChildren.map((child, index) => (
				<div
					className={`${index % 2 === 0 ? "bg-secondary text-primary" : "bg-primary text-secondary"}`}
					key={index}
				>
					{child}
				</div>
			))}
		</div>
	);
}
