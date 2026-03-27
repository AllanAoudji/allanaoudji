"use client";

import SectionError from "@/components/SectionError";

type Props = {
	error: Error;
	reset: () => void;
};

export default function RootError({ error, reset }: Readonly<Props>) {
	return <SectionError error={error} reset={reset} />;
}
