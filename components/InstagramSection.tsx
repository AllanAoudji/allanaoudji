import Image from "next/image";
import InstagramSectionIcon from "./InstagramSectionIcon";
import SubTitle from "./SubTitle";
import { InstagramFeeds } from "@/types/instagramFeed";

const END_POINT = "https://graph.instagram.com/";
const FIELDS =
	"fields=id,media_type,media_url,alt_text,comments_count,like_count,thumbnail_url&limit=4";

async function getData(): Promise<InstagramFeeds> {
	const res = await fetch(
		`${END_POINT}/me/media?${FIELDS}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
	);

	return res.json();
}

export default async function InstagramSection() {
	const data = await getData();

	if (data.error) {
		return null;
	}

	return (
		<section className="section-container section-separator">
			<SubTitle>Instagram</SubTitle>
			<a
				className="items-gap mt-5 grid grid-cols-2 lg:grid-cols-4"
				href="https://www.instagram.com/allanaoudji/"
				target="_blank"
			>
				{data.data.map(post => (
					<div key={post.id} className="text-primary">
						<Image
							alt="instagram post"
							className="border-quaternary border-4"
							height={1350}
							src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
							width={1080}
						/>
						<div className="bg-quaternary flex w-full justify-center gap-5 p-2">
							<InstagramSectionIcon type="likes" count={post.like_count} />
							<InstagramSectionIcon type="comments" count={post.comments_count} />
						</div>
					</div>
				))}
			</a>
		</section>
	);
}
