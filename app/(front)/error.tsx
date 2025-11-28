"use client";

import { useCallback } from "react";
import Title from "@/components/Title";

type Props = {
	error: Error;
	reset?: () => void;
};

export default function Error({ error, reset }: Readonly<Props>) {
	const clickReset = useCallback(() => {
		if (reset) {
			reset();
		}
	}, [reset]);

	return (
		<div>
			<Title>Oh no!</Title>
			<p>
				There was an issue with our storefront. This could be a temporary issue, please try your action
				again.
			</p>
			<p>{error.message}</p>
			<button onClick={clickReset}>Try again</button>
		</div>
	);
}
