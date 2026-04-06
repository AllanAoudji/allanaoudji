import * as Sentry from "@sentry/nextjs";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { ERROR_CODE, TAGS } from "@/lib/constants";
import InstagramSectionContainer from "./InstagramSectionContainer";
import InstagramSectionItem from "./InstagramSectionItem";
import InstagramFeeds from "@/types/instagramFeed";

type Props = {
	className?: string;
};

const INSTAGRAM_API_URL =
	"https://graph.instagram.com/me/media" +
	"?fields=id,media_type,media_url,alt_text,comments_count,like_count,thumbnail_url" +
	"&limit=6";

const getData = cache(
	unstable_cache(
		async () => {
			const res = await fetch(
				`${INSTAGRAM_API_URL}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
			);

			if (!res.ok) {
				Sentry.captureMessage("Instagram API HTTP error", {
					level: "error",
					extra: { status: res.status, statusText: res.statusText },
				});
				throw new Error(ERROR_CODE.EXTERNAL_API_ERROR);
			}

			const data: InstagramFeeds = await res.json();

			if (data.error) {
				Sentry.captureMessage("Instagram API returned an error", {
					level: "error",
					extra: {
						code: data.error.code,
						message: data.error.message,
						type: data.error.type,
					},
				});
				throw new Error(ERROR_CODE.EXTERNAL_API_ERROR);
			}

			return data;
		},
		["instagram-feeds"],
		{
			revalidate: 86400,
			tags: [TAGS.instagram],
		},
	),
);

export default async function InstagramSection({ className }: Readonly<Props>) {
	const data = await getData();

	if (!data.data.length) {
		return null;
	}

	return (
		<InstagramSectionContainer className={className}>
			{data.data.map(post => (
				<InstagramSectionItem key={post.id} post={post} />
			))}
		</InstagramSectionContainer>
	);
}
