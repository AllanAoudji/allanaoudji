import "server-only";
import { assertValue } from "@/lib/utils";

export const serverToken = assertValue(
	process.env.SANITY_SERVER_TOKEN,
	"Missing environment variable: SANITY_SERVER_TOKEN",
);
