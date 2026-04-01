import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	enabled: !isDev,
	tracesSampleRate: isDev ? 0 : 0.2,

	ignoreErrors: ["AbortError", "NetworkError", "Failed to fetch"],

	beforeSend(event, hint) {
		const error = hint?.originalException as Error | undefined;

		if (error?.name === "AbortError") {
			return null;
		}

		return event;
	},
});
