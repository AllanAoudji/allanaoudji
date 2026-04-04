import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";
const sentryEnabled = process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	enabled: !isDev || sentryEnabled,

	tracesSampleRate: isDev && !sentryEnabled ? 0 : 0.2,

	ignoreErrors: ["NetworkError"],

	beforeSend(event, hint) {
		const error = hint?.originalException as Error | undefined;

		if (!error) return event;

		if (error.name === "AbortError") return null;

		return event;
	},
});
