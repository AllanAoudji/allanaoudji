import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";
const sentryEnabled = process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	enabled: !isDev || sentryEnabled,

	tracesSampleRate: isDev && !sentryEnabled ? 0 : 0.2,

	replaysOnErrorSampleRate: 1,
	replaysSessionSampleRate: 0.01,

	integrations: [Sentry.replayIntegration()],

	ignoreErrors: ["NetworkError"],

	beforeSend(event, hint) {
		const error = hint?.originalException as Error | undefined;

		if (!error) return event;

		if (error.name === "AbortError") return null;

		if (error.message?.includes("aborted")) return null;

		if (error.message?.includes("was not found on the server")) return null;
		if (error.message?.includes("NEXT_REDIRECT")) return null;
		if (error.message?.includes("NEXT_NOT_FOUND")) return null;

		return event;
	},
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
