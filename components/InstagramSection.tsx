import * as Sentry from "@sentry/nextjs";
import { ERROR_CODE } from "@/lib/constants";
import InstagramSectionContainer from "./InstagramSectionContainer";
import InstagramSectionItem from "./InstagramSectionItem";
import InstagramFeeds from "@/types/instagramFeed";

type Props = {
	className?: string;
};

const END_POINT = "/me/media";
const FIELDS =
	"?fields=id,media_type,media_url,alt_text,comments_count,like_count,thumbnail_url&limit=6";
const ROOT = "https://graph.instagram.com/";

async function getData(): Promise<InstagramFeeds> {
	const res = await fetch(
		`${ROOT}${END_POINT}${FIELDS}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
		{ cache: "no-store" },
	);

	if (!res.ok) {
		Sentry.captureMessage("Instagram API HTTP error", {
			level: "error",
			extra: {
				status: res.status,
				statusText: res.statusText,
			},
		});
		throw new Error(ERROR_CODE.EXTERNAL_API_ERROR);
	}

	const data = await res.json();

	return data;
}

export default async function InstagramSection({ className }: Readonly<Props>) {
	const data = await getData();

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
