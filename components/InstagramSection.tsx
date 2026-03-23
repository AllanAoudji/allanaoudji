import InstagramSectionContainer from "./InstagramSectionContainer";
import InstagramSectionItem from "./InstagramSectionItem";
import InstagramFeeds from "@/types/instagramFeed";

const ROOT = "https://graph.instagram.com/";
const END_POINT = "/me/media";
const FIELDS =
	"?fields=id,media_type,media_url,alt_text,comments_count,like_count,thumbnail_url&limit=6";

async function getData(): Promise<InstagramFeeds> {
	const res = await fetch(
		`${ROOT}${END_POINT}${FIELDS}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
		{ cache: "no-store" },
	);

	return await res.json();
}

export default async function InstagramSection() {
	const data = await getData();

	if (data.error) {
		throw new Error(data.error.message);
	}

	return (
		<InstagramSectionContainer className="bg-quaternary text-primary">
			{data.data.map(post => (
				<InstagramSectionItem key={post.id} post={post} />
			))}
		</InstagramSectionContainer>
	);
}
