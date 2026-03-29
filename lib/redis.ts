// lib/redis.ts
import { Redis } from "@upstash/redis";

export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function checkRateLimit(ip: string) {
	const key = `contact:${ip}`;
	const count = Number((await redis.get(key)) || 0);

	if (count >= 5) {
		throw new Error("Trop de messages envoyés. Réessayez plus tard.");
	}

	await redis.incr(key);
	await redis.expire(key, 60);
}
