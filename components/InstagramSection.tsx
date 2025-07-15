import Image from "next/image";
import SubTitle from "./SubTitle";

type Data =
	| {
			id: string;
			media_type: "IMAGE" | "CAROUSEL_ALBUM";
			media_url: string;
			like_count: number;
			comments_count: number;
	  }
	| {
			id: string;
			media_type: "VIDEO";
			media_url: string;
			thumbnail_url: string;
			like_count: number;
			comments_count: number;
	  };

type InstaFeeds = {
	data: Data[];
	paging: {
		cursors: {
			after: string;
			before: string;
		};
		next: string;
	};
};

async function getData(): Promise<InstaFeeds> {
	const res = await fetch(
		`https://graph.instagram.com/me/media?fields=id,media_type,media_url,alt_text,comments_count,like_count,thumbnail_url&limit=4&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
	);

	return res.json();
}

export default async function InstagramSection() {
	const data = await getData();

	console.log(data);

	return (
		<section className="section-container section-separator">
			<SubTitle>Instagram</SubTitle>
			<a
				className="items-gap grid-default pt-5"
				href="https://www.instagram.com/allanaoudji/"
				target="_blank"
			>
				{data.data.map(image => (
					<div key={image.id}>
						<Image alt="instagram image" src={image.media_url} width={1080} height={1350} />
						<div>
							<p>likes: {image.like_count}</p>
							<p>comments: {image.comments_count}</p>
						</div>
					</div>
				))}
			</a>
		</section>
	);
}
