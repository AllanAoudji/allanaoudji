import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Désactive en dev pour éviter le spam
	enabled: !isDev,

	tracesSampleRate: isDev ? 0 : 0.2,

	replaysOnErrorSampleRate: isDev ? 0 : 1,
	replaysSessionSampleRate: isDev ? 0 : 0.05,

	integrations: [Sentry.replayIntegration()],

	ignoreErrors: ["AbortError", "NetworkError", "Failed to fetch", "Load failed"],

	beforeSend(event, hint) {
		const error = hint?.originalException as Error | undefined;

		// Ignore AbortError (Next.js streaming / navigation)
		if (error?.name === "AbortError") {
			return null;
		}

		// Ignore erreurs fetch annulées
		if (error?.message?.includes("fetch")) {
			if (error.message.includes("aborted")) return null;
		}

		return event;
	},
});
