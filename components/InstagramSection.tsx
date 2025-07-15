import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
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
				className="items-gap grid grid-cols-2 pt-5 lg:grid-cols-4"
				href="https://www.instagram.com/allanaoudji/"
				target="_blank"
			>
				{data.data.map(image => (
					<div key={image.id} className="text-primary relative">
						<Image
							alt="instagram image"
							className="border-quaternary border-4"
							src={image.media_url}
							width={1080}
							height={1350}
						/>
						<div className="bg-quaternary flex w-full justify-center gap-5 p-2">
							<div className="flex">
								<div className="flex pr-2">
									<FaHeart className="my-auto" size="20px" />
								</div>
								<p className="inline-block align-middle">{image.like_count}</p>
							</div>
							<div className="flex">
								<div className="flex pr-2">
									<FaCommentAlt className="my-auto" size="20px" />
								</div>
								<p className="inline-block align-middle">{image.comments_count}</p>
							</div>
						</div>
					</div>
				))}
			</a>
		</section>
	);
}
