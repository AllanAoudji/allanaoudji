"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import SectionError from "@/components/SectionError";

type Props = {
	error: Error;
	reset: () => void;
};

export default function RootError({ error, reset }: Readonly<Props>) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return <SectionError error={error} reset={reset} />;
}
