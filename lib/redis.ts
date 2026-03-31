import { Redis } from "@upstash/redis";
import { ERROR_CODE } from "./constants";

export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function checkRateLimit(ip: string) {
	const key = `contact:${ip}`;
	const count = Number((await redis.get(key)) || 0);

	if (count >= 5) {
		throw new Error(ERROR_CODE.TOO_MANY_MESSAGES);
	}

	await redis.incr(key);
	await redis.expire(key, 60);
}
