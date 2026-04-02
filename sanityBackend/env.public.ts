import { ERROR_CODE } from "@/lib/constants";
import { assertValue } from "@/lib/utils";

export const apiVersion = "2025-02-06";
export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	ERROR_CODE.MISSING_ENV_VARIABLE,
);
export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	ERROR_CODE.MISSING_ENV_VARIABLE,
);
